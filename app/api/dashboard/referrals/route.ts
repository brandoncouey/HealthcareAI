import {NextRequest, NextResponse} from 'next/server'
import prisma from '@/app/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const organizationId = searchParams.get('organizationId')
        
        // Query with all related data, filtered by organization
        const referrals = await prisma.referral.findMany({
            where: organizationId ? {
                patient: { organizationId }
            } : {},
            include: {
                patient: {
                    include: {
                        organization: true
                    }
                },
                diagnoses: {
                    include: {
                        diagnosis: true
                    }
                },
                services: {
                    include: {
                        service: true
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
        })



        // Transform data to match frontend expectations
        const transformedReferrals = referrals.map((referral) => {
            // Get patient name
            const patientName = referral.patient ?
                `${referral.patient.firstName} ${referral.patient.lastName}` :
                'Unknown Patient'

            // Get referring facility (using organization name for now)
            const referringFacility = referral.patient?.organization?.name || 'Unknown Facility'

            // Get insurance details
            const primaryCoverage = referral.coverages[0] // Get first coverage
            const primaryPayor = primaryCoverage?.payer?.name || 'Unknown Insurance'
            const planName = primaryCoverage?.policyNumber || 'Unknown Plan'

            // Get diagnoses
            const diagnoses = referral.diagnoses.map(rd => ({
                code: rd.diagnosis?.code || 'N/A',
                display: rd.diagnosis?.display || 'N/A',
                isPrimary: rd.isPrimary
            }))

            // Get primary diagnosis
            const primaryDiagnosis = referral.diagnoses.find(rd => rd.isPrimary)
            const primaryDxText = primaryDiagnosis?.diagnosis?.display || referral.primaryDxText || 'N/A'
            const primaryDxCode = primaryDiagnosis?.diagnosis?.code || referral.primaryDxCode || 'N/A'

            // Get services
            const services = referral.services.map(rs => ({
                service: rs.service?.name || 'Unknown Service',
                detail: rs.status || 'N/A',
                notes: 'N/A'
            }))

            // Get medications
            const medications = referral.medications.map(rm => ({
                name: rm.medication?.name || 'Unknown Medication',
                isHighCost: rm.isHighCost || false
            }))

            // Calculate time passed (simplified for now)
            const timePassed = calculateTimePassed(referral.createdAt)

            // Determine status based on various factors
            const status = determineReferralStatus(referral, services, diagnoses)

            // Determine completion status for each section
            const coverage = determineCoverageStatus(referral.coverages)
            const clinical = determineClinicalStatus(referral.diagnoses, referral.services)
            const homeSupport = determineHomeSupportStatus(referral.livesWith, referral.ecName)
            const zipCode = determineLocationStatus(referral.patient)

            return {
                id: referral.id,
                status,
                name: patientName,
                timePassed,
                referringFacility,
                primaryPayor: `${primaryPayor} - ${planName}`,
                coverage,
                clinical,
                homeSupport,
                zipCode,
                // Additional data for modals
                hmoPlanType: referral.hmoPlanType || 'N/A',
                medicareHmoProvider: referral.medicareHmoProvider || 'N/A',
                primaryDxText,
                primaryDxCode,
                ntaScore: referral.ntaScore || 'Medium',
                diagnoses,
                services,
                medications,
                // Patient details for location modal
                address: referral.patient?.addressLine1 || 'N/A',
                city: referral.patient?.city || 'N/A',
                state: referral.patient?.state || 'N/A',
                postalCode: referral.patient?.postalCode || 'N/A',
                // Home support details
                livesWith: referral.livesWith || 'Not specified',
                ecName: referral.ecName || 'Not specified',
                ecPhone: referral.ecPhone || 'Not specified',
                ecRelation: referral.ecRelation || 'Not specified'
            }
        })

        return NextResponse.json(transformedReferrals)
    } catch (error) {
        console.error('Error fetching referrals:', error)
        return NextResponse.json(
            {error: 'Failed to fetch referrals', details: error instanceof Error ? error.message : 'Unknown error'},
            {status: 500}
        )
    }
}

// Helper function to calculate time passed
function calculateTimePassed(createdAt: Date): string {
    const now = new Date()
    const diffInMs = now.getTime() - createdAt.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
}

// Helper function to determine referral status
function determineReferralStatus(referral: any, services: any[], diagnoses: any[]): string[] {
    const status: string[] = ['NEW']

    // Add AM (Admission Management) if patient has complex needs
    if (services.length > 2 || diagnoses.length > 5) {
        status.push('AM')
    }

    // Add OP (Outpatient) if it's a follow-up referral
    if (referral.ntaScore === 'Low') {
        status.push('OP')
    }

    return status
}

// Helper function to determine coverage status
function determineCoverageStatus(coverages: any[]): string {
    if (coverages.length > 0) {
        return 'complete'
    }
    return 'pending'
}

// Helper function to determine clinical status
function determineClinicalStatus(diagnoses: any[], services: any[]): string {
    if (diagnoses.length > 0 && services.length > 0) {
        return 'complete'
    }
    return 'pending'
}

// Helper function to determine home support status
function determineHomeSupportStatus(livesWith: string | null, ecName: string | null): string {
    if (livesWith && ecName) {
        return 'complete'
    }
    return 'pending'
}

// Helper function to determine location status
function determineLocationStatus(patient: any): string {
    if (patient?.addressLine1 && patient?.city && patient?.state && patient?.postalCode) {
        return 'complete'
    }
    return 'pending'
}
