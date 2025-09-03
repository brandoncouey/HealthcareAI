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
      prisma.service.count(), // Global count of available services
      prisma.payer.count(), // Global count of available payers
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
        services: {
          include: {
            service: true
          }
        }
      },
    })

    // Transform recent referrals to match expected format
    const transformedReferrals = recentReferrals.map(referral => ({
      id: referral.id,
      patientName: `${referral.patient.firstName} ${referral.patient.lastName}`,
      primaryDiagnosis: referral.primaryDxText || 'Not specified',
      ntaScore: referral.ntaScore || 'Not specified',
      createdAt: referral.createdAt,
      services: referral.services.map(rs => ({
        label: rs.service.name,
        present: rs.status === 'approved' || rs.status === 'completed'
      }))
    }))

    // Get service distribution
    const serviceDistribution = await prisma.referralService.groupBy({
      by: ['serviceId'],
      _count: {
        serviceId: true
      },
      where: organizationId ? {
        referral: {
          patient: { organizationId }
        }
      } : {},
      orderBy: {
        _count: {
          serviceId: 'desc'
        }
      },
      take: 5
    })

    // Get service names for distribution
    const serviceIds = serviceDistribution.map(s => s.serviceId)
    const services = await prisma.service.findMany({
      where: { id: { in: serviceIds } }
    })

    const serviceDistributionWithNames = serviceDistribution.map(s => {
      const service = services.find(serv => serv.id === s.serviceId)
      return {
        service: service?.name || 'Unknown Service',
        count: s._count.serviceId
      }
    })

    // Get payer distribution
    const payerDistribution = await prisma.referralCoverage.groupBy({
      by: ['payerId'],
      _count: {
        payerId: true
      },
      where: organizationId ? {
        referral: {
          patient: { organizationId }
        }
      } : {},
      orderBy: {
        _count: {
          payerId: 'desc'
        }
      },
      take: 5
    })

    // Get payer names for distribution
    const payerIds = payerDistribution.map(p => p.payerId)
    const payers = await prisma.payer.findMany({
      where: { id: { in: payerIds } }
    })

    const payerDistributionWithNames = payerDistribution.map(p => {
      const payer = payers.find(pay => pay.id === p.payerId)
      return {
        payer: payer?.name || 'Unknown Payer',
        count: p._count.payerId
      }
    })

    // Get referral trends (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
    
    const referralTrends = await prisma.referral.groupBy({
      by: ['createdAt'],
      _count: {
        id: true
      },
      where: {
        createdAt: {
          gte: sixMonthsAgo
        },
        ...(organizationId && {
          patient: { organizationId }
        })
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    // Transform trends to monthly format
    const monthlyTrends = referralTrends.reduce((acc, trend) => {
      const month = trend.createdAt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      const existing = acc.find(t => t.month === month)
      if (existing) {
        existing.count += trend._count.id
      } else {
        acc.push({ month, count: trend._count.id })
      }
      return acc
    }, [] as Array<{ month: string; count: number }>)

    return {
      totalPatients,
      totalReferrals,
      activeReferrals,
      totalServices,
      totalPayers,
      recentReferrals: transformedReferrals,
      serviceDistribution: serviceDistributionWithNames,
      payerDistribution: payerDistributionWithNames,
      referralTrends: monthlyTrends
    }
  } catch (error) {
    console.error('Error in getDashboardStats:', error)
    throw error
  }
}

export async function getPatients(organizationId?: string): Promise<PatientOverview[]> {
  try {
    const patients = await prisma.patient.findMany({
      where: organizationId ? { organizationId } : {},
      include: {
        referrals: {
          include: {
            services: {
              include: {
                service: true
              }
            },
            disciplines: {
              include: {
                discipline: true
              }
            },
            medications: {
              include: {
                medication: true
              }
            },
            coverages: {
              include: {
                payer: true
              }
            }
          }
        },
        contacts: true
      },
      orderBy: {
        lastName: 'asc'
      }
    })

    return patients.map(patient => {
      const latestReferral = patient.referrals[0] // Most recent referral
      
      return {
        id: patient.id,
        firstName: patient.firstName,
        lastName: patient.lastName,
        age: patient.age || 0,
        primaryDiagnosis: latestReferral?.primaryDxText || 'Not specified',
        ntaScore: latestReferral?.ntaScore || 'Not specified',
        services: latestReferral?.services.map(rs => ({
          label: rs.service.name,
          present: rs.status === 'approved' || rs.status === 'completed',
          notes: rs.status
        })) || [],
        disciplines: latestReferral?.disciplines.map(rd => ({
          name: rd.discipline.name
        })) || [],
        medications: latestReferral?.medications.map(rm => ({
          name: rm.medication.name,
          isHighCost: false // Default value, could be enhanced with actual cost data
        })) || [],
        emergencyContact: {
          name: patient.contacts[0]?.name || patient.emergencyContact || 'Not specified',
          phone: patient.contacts[0]?.phone || patient.emergencyPhone || 'Not specified',
          relation: patient.contacts[0]?.relation || 'Not specified'
        }
      }
    })
  } catch (error) {
    console.error('Error in getPatients:', error)
    throw error
  }
}

export async function getReferrals(organizationId?: string) {
  try {
    const referrals = await prisma.referral.findMany({
      where: organizationId ? {
        patient: { organizationId }
      } : {},
      include: {
        patient: true,
        services: {
          include: {
            service: true
          }
        },
        disciplines: {
          include: {
            discipline: true
          }
        },
        coverages: {
          include: {
            payer: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return referrals.map(referral => ({
      id: referral.id,
      patientName: `${referral.patient.firstName} ${referral.patient.lastName}`,
      patientId: referral.patientId,
      primaryDiagnosis: referral.primaryDxText || 'Not specified',
      ntaScore: referral.ntaScore || 'Not specified',
      services: referral.services.map(rs => rs.service.name),
      disciplines: referral.disciplines.map(rd => rd.discipline.name),
      payers: referral.coverages.map(rc => rc.payer.name),
      createdAt: referral.createdAt,
      status: referral.completedAt ? 'Completed' : 'Active'
    }))
  } catch (error) {
    console.error('Error in getReferrals:', error)
    throw error
  }
}
