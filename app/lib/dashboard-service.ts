import prisma from './prisma'

export interface DashboardStats {
  totalPatients: number
  totalReferrals: number
  activeReferrals: number
  totalServices: number
  totalPayers: number
  recentReferrals: Array<{
    id: string
    patientName: string
    primaryDiagnosis: string
    ntaScore: string
    createdAt: Date
    services: Array<{ label: string; present: boolean }>
  }>
  serviceDistribution: Array<{ service: string; count: number }>
  payerDistribution: Array<{ payer: string; count: number }>
  referralTrends: Array<{ month: string; count: number }>
}

export interface PatientOverview {
  id: string
  firstName: string
  lastName: string
  age: number
  primaryDiagnosis: string
  ntaScore: string
  services: Array<{ label: string; present: boolean; notes?: string }>
  disciplines: Array<{ name: string }>
  medications: Array<{ name: string; isHighCost: boolean }>
  emergencyContact: { name: string; phone: string; relation: string }
}

export async function getDashboardStats(organizationId?: string): Promise<DashboardStats> {
  try {
    // Build organization filter
    const orgFilter = organizationId ? { organizationId } : {}
    
    // Get basic counts filtered by organization
    const [totalPatients, totalReferrals, totalServices, totalPayers] = await Promise.all([
      prisma.patient.count({ where: orgFilter }),
      prisma.referral.count({ 
        where: organizationId ? {
          patient: { organizationId }
        } : {}
      }),
      // Services used by this organization's referrals
      organizationId ? 
        prisma.referralService.count({
          where: {
            referral: {
              patient: { organizationId }
            }
          }
        }) : 
        prisma.service.count(), // Global count if no organization
      // Payers used by this organization's referrals  
      organizationId ? 
        prisma.referralCoverage.count({
          where: {
            referral: {
              patient: { organizationId }
            }
          }
        }) : 
        prisma.payer.count(), // Global count if no organization
    ])

    // Get active referrals (created in last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const activeReferrals = await prisma.referral.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
        ...(organizationId && {
          patient: { organizationId }
        })
      },
    })

    // Get recent referrals with patient details
    const recentReferrals = await prisma.referral.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      where: organizationId ? {
        patient: { organizationId }
      } : {},
      include: {
        patient: true,
      },
    })

    // Get service distribution with actual service names
    const serviceDistribution = await prisma.referralService.groupBy({
      by: ['serviceId'],
      _count: {
        serviceId: true,
      },
      where: organizationId ? {
        referral: {
          patient: { organizationId }
        }
      } : {},
    })

    // Get payer distribution with actual payer names
    const payerDistribution = await prisma.referralCoverage.groupBy({
      by: ['payerId'],
      _count: {
        payerId: true,
      },
      where: organizationId ? {
        referral: {
          patient: { organizationId }
        }
      } : {},
    })

    // Get referral trends (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
    
    const referralTrends = await prisma.referral.groupBy({
      by: ['createdAt'],
      _count: {
        id: true,
      },
      where: {
        createdAt: {
          gte: sixMonthsAgo,
        },
        ...(organizationId && {
          patient: { organizationId }
        })
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    // Get actual service names for distribution
    const serviceNames = await prisma.service.findMany({
      where: {
        id: { in: serviceDistribution.map(sd => sd.serviceId) }
      },
      select: { id: true, name: true }
    })

    // Get actual payer names for distribution
    const payerNames = await prisma.payer.findMany({
      where: {
        id: { in: payerDistribution.map(pd => pd.payerId) }
      },
      select: { id: true, name: true }
    })

    return {
      totalPatients,
      totalReferrals,
      activeReferrals,
      totalServices,
      totalPayers,
      recentReferrals: recentReferrals.map(ref => ({
        id: ref.id,
        patientName: `${ref.patient.firstName} ${ref.patient.lastName}`,
        primaryDiagnosis: ref.primaryDxText || 'Not specified',
        ntaScore: ref.ntaScore || 'Not specified',
        createdAt: ref.createdAt,
        services: [],
      })),
      serviceDistribution: serviceDistribution.map(sd => {
        const service = serviceNames.find(s => s.id === sd.serviceId)
        return {
          service: service?.name || `Service ${sd.serviceId}`,
          count: sd._count.serviceId,
        }
      }),
      payerDistribution: payerDistribution.map(pd => {
        const payer = payerNames.find(p => p.id === pd.payerId)
        return {
          payer: payer?.name || `Payer ${pd.payerId}`,
          count: pd._count.payerId,
        }
      }),
      referralTrends: referralTrends.map(rt => ({
        month: rt.createdAt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        count: rt._count.id,
      })),
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    throw new Error('Failed to fetch dashboard statistics')
  }
}

export async function getPatientOverview(patientId: string): Promise<PatientOverview | null> {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      include: {
        referrals: {
          include: {
            referralServices: {
              include: {
                service: true,
              },
            },
            referralDisciplines: {
              include: {
                discipline: true,
              },
            },
            referralMedications: {
              include: {
                medication: true,
              },
            },
            referralDiagnoses: {
              where: { isPrimary: true },
              include: {
                diagnosis: true,
              },
            },
          },
        },
        contacts: {
          take: 1,
        },
      },
    })

    if (!patient) return null

    const referral = patient.referrals[0] // Get the most recent referral
    if (!referral) return null

    // Calculate age
    const age = patient.dob ? Math.floor((Date.now() - patient.dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : 0

    return {
      id: patient.id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      age,
      primaryDiagnosis: referral.primaryDxText || 'Not specified',
      ntaScore: referral.ntaScore || 'Not specified',
      services: referral.referralServices.map(rs => ({
        label: rs.service.label,
        present: rs.present || false,
        notes: rs.notes || undefined,
      })),
      disciplines: referral.referralDisciplines.map(rd => ({
        name: rd.discipline.name,
      })),
      medications: referral.referralMedications.map(rm => ({
        name: rm.medication.name,
        isHighCost: rm.isHighCost || false,
      })),
      emergencyContact: patient.contacts[0] ? {
        name: patient.contacts[0].name,
        phone: patient.contacts[0].phone || 'Not provided',
        relation: patient.contacts[0].relation || 'Not specified',
      } : {
        name: 'Not provided',
        phone: 'Not provided',
        relation: 'Not specified',
      },
    }
  } catch (error) {
    console.error('Error fetching patient overview:', error)
    throw new Error('Failed to fetch patient overview')
  }
}

export async function getAllPatients(organizationId?: string) {
  try {
    const patients = await prisma.patient.findMany({
      where: organizationId ? { organizationId } : {},
      orderBy: {
        lastName: 'asc',
      },
    })

    return patients.map(patient => ({
      id: patient.id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      age: patient.dob ? Math.floor((Date.now() - patient.dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : 0,
      primaryDiagnosis: 'Not specified',
      ntaScore: 'Not specified',
      services: 'None',
      emergencyContact: 'Not provided',
      city: patient.city || 'Not specified',
      state: patient.state || 'Not specified',
    }))
  } catch (error) {
    console.error('Error fetching all patients:', error)
    throw new Error('Failed to fetch patients')
  }
}

export async function getReferralAnalytics() {
  try {
    // Get referral counts by month for the last 12 months
    const twelveMonthsAgo = new Date()
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12)
    
    const monthlyReferrals = await prisma.referral.groupBy({
      by: ['createdAt'],
      _count: {
        id: true,
      },
      where: {
        createdAt: {
          gte: twelveMonthsAgo,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    // Get service utilization
    const serviceUtilization = await prisma.referralService.groupBy({
      by: ['serviceId'],
      _count: {
        id: true,
      },
      include: {
        service: true,
      },
    })

    // Get NTA score distribution
    const ntaDistribution = await prisma.referral.groupBy({
      by: ['ntaScore'],
      _count: {
        id: true,
      },
    })

    return {
      monthlyReferrals: monthlyReferrals.map(mr => ({
        month: mr.createdAt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        count: mr._count.id,
      })),
      serviceUtilization: serviceUtilization.map(su => ({
        service: su.service.label,
        count: su._count.id,
      })),
      ntaDistribution: ntaDistribution.map(nd => ({
        score: nd.ntaScore || 'Not specified',
        count: nd._count.id,
      })),
    }
  } catch (error) {
    console.error('Error fetching referral analytics:', error)
    throw new Error('Failed to fetch referral analytics')
  }
}
