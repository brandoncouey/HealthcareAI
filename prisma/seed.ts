import { PrismaClient, UserRole, OrganizationRole } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting comprehensive multi-organization database seed...')

  // Hash the password once for all users
  const hashedPassword = await bcrypt.hash('testing123', 12)
  
  // Create multiple users with different global roles
  const users = [
    {
      email: 'admin@exponential.com',
      name: 'Exponential AI Admin',
      password: hashedPassword,
      globalRole: UserRole.SUPERADMIN  // Global role for admin panel access
    },
    {
      email: 'dr.sarah@healthcare.org',
      name: 'Dr. Sarah Martinez',
      password: hashedPassword,
      globalRole: UserRole.ADMIN  // Global role for admin panel access
    },
    {
      email: 'nurse.mike@healthcare.org',
      name: 'Mike Johnson',
      password: hashedPassword,
      globalRole: UserRole.ADMIN  // Global role for admin panel access
    },
    {
      email: 'therapist.lisa@healthcare.org',
      name: 'Lisa Thompson',
      password: hashedPassword,
      globalRole: UserRole.MEMBER  // Global role - no admin panel access
    }
  ]

  // Create users
  const createdUsers = []
  for (const userData of users) {
    let user = await prisma.user.findUnique({
      where: { email: userData.email }
    })

    if (!user) {
      console.log(`👤 Creating user: ${userData.name} (Global Role: ${userData.globalRole})`)
      
      user = await prisma.user.create({
        data: {
          email: userData.email,
          name: userData.name,
          password: userData.password,
          role: userData.globalRole,  // This is their GLOBAL role for admin panel access
          settings: {
            theme: 'dark',
            notifications: {
              email: true,
              push: true,
              sms: false
            },
            privacy: {
              profileVisibility: 'private',
              dataSharing: false,
              analytics: true
            }
          }
        }
      })
      console.log(`✅ User created: ${user.email}`)
    } else {
      console.log(`👤 User already exists: ${user.email} (Global Role: ${userData.globalRole})`)
    }
    createdUsers.push(user)
  }

  // Create 3 healthcare organizations
  const organizations = [
    {
      name: 'Exponential Healthcare Network',
      type: 'healthcare_system',
      address: '1234 Healthcare Boulevard',
      city: 'Medical City',
      state: 'CA',
      zipCode: '90210',
      phone: '+1-555-0123',
      website: 'https://exponentialhealthcare.org'
    },
    {
      name: 'Mercy General Hospital',
      type: 'hospital',
      address: '5678 Mercy Drive',
      city: 'Healthcare Valley',
      state: 'CA',
      zipCode: '90211',
      phone: '+1-555-0456',
      website: 'https://mercygeneral.org'
    },
    {
      name: 'Community Care Clinic',
      type: 'clinic',
      address: '9012 Community Way',
      city: 'Wellness Town',
      state: 'CA',
      zipCode: '90212',
      phone: '+1-555-0789',
      website: 'https://communitycare.org'
    }
  ]

  const createdOrgs = []
  for (const orgData of organizations) {
    const org = await prisma.organization.upsert({
      where: { name: orgData.name },
      update: {},
      create: orgData
    })
    createdOrgs.push(org)
    console.log(`🏥 Organization created: ${org.name}`)
  }

  // Assign users to organizations with DIFFERENT roles than their global role
  // This demonstrates the dual-role system
  const userOrgAssignments = [
    // Exponential Healthcare Network
    { userId: createdUsers[0].id, organizationId: createdOrgs[0].id, role: OrganizationRole.OWNER },      // Superadmin as ORG OWNER
    { userId: createdUsers[1].id, organizationId: createdOrgs[0].id, role: OrganizationRole.MEMBER },     // Admin as ORG MEMBER
    { userId: createdUsers[2].id, organizationId: createdOrgs[0].id, role: OrganizationRole.ADMIN },      // Admin as ORG ADMIN
    { userId: createdUsers[3].id, organizationId: createdOrgs[0].id, role: OrganizationRole.VIEWER },     // Member as ORG VIEWER
    
    // Mercy General Hospital
    { userId: createdUsers[1].id, organizationId: createdOrgs[1].id, role: OrganizationRole.OWNER },      // Admin as ORG OWNER
    { userId: createdUsers[0].id, organizationId: createdOrgs[1].id, role: OrganizationRole.MEMBER },     // Superadmin as ORG MEMBER
    { userId: createdUsers[2].id, organizationId: createdOrgs[1].id, role: OrganizationRole.ADMIN },      // Admin as ORG ADMIN
    { userId: createdUsers[3].id, organizationId: createdOrgs[1].id, role: OrganizationRole.MEMBER },     // Member as ORG MEMBER
    
    // Community Care Clinic
    { userId: createdUsers[2].id, organizationId: createdOrgs[2].id, role: OrganizationRole.OWNER },      // Admin as ORG OWNER
    { userId: createdUsers[0].id, organizationId: createdOrgs[2].id, role: OrganizationRole.MEMBER },     // Superadmin as ORG MEMBER
    { userId: createdUsers[1].id, organizationId: createdOrgs[2].id, role: OrganizationRole.ADMIN },      // Admin as ORG ADMIN
    { userId: createdUsers[3].id, organizationId: createdOrgs[2].id, role: OrganizationRole.VIEWER }      // Member as ORG VIEWER
  ]

  for (const assignment of userOrgAssignments) {
    await prisma.userOrganization.upsert({
      where: {
        userId_organizationId: {
          userId: assignment.userId,
          organizationId: assignment.organizationId
        }
      },
      update: { role: assignment.role },
      create: assignment
    })
  }

  console.log('✅ Users assigned to organizations with dual-role system')
  console.log('📋 Role Summary:')
  console.log('   - Global Roles: Control admin panel access')
  console.log('   - Organization Roles: Control org-specific permissions')

  // Create comprehensive services
  const services = [
    { name: 'Home Health Care', category: 'Home Health', description: 'Comprehensive in-home healthcare services' },
    { name: 'Physical Therapy', category: 'Rehabilitation', description: 'Physical rehabilitation and mobility training' },
    { name: 'Occupational Therapy', category: 'Rehabilitation', description: 'Daily living skills and functional training' },
    { name: 'Speech Therapy', category: 'Rehabilitation', description: 'Communication and swallowing rehabilitation' },
    { name: 'Medical Equipment', category: 'Durable Medical Equipment', description: 'Home medical equipment and supplies' },
    { name: 'Nursing Care', category: 'Skilled Nursing', description: 'Professional nursing care and monitoring' },
    { name: 'Wound Care', category: 'Specialized Care', description: 'Advanced wound treatment and management' },
    { name: 'Palliative Care', category: 'Specialized Care', description: 'Comfort and quality of life care' },
    { name: 'Respiratory Therapy', category: 'Specialized Care', description: 'Breathing and respiratory support' },
    { name: 'Nutrition Counseling', category: 'Wellness', description: 'Dietary guidance and meal planning' }
  ]

  for (const service of services) {
    await prisma.service.createMany({
      data: service,
      skipDuplicates: true
    })
  }

  console.log('✅ Comprehensive services created')

  // Create comprehensive diagnoses
  const diagnoses = [
    { code: 'I50.9', display: 'Heart failure, unspecified', category: 'Cardiovascular' },
    { code: 'J44.9', display: 'Chronic obstructive pulmonary disease, unspecified', category: 'Respiratory' },
    { code: 'E11.9', display: 'Type 2 diabetes mellitus without complications', category: 'Endocrine' },
    { code: 'I63.9', display: 'Cerebral infarction, unspecified', category: 'Neurological' },
    { code: 'M79.3', display: 'Pain in unspecified site', category: 'Musculoskeletal' },
    { code: 'I10', display: 'Essential (primary) hypertension', category: 'Cardiovascular' },
    { code: 'M81.0', display: 'Age-related osteoporosis without current pathological fracture', category: 'Musculoskeletal' },
    { code: 'G30.9', display: 'Alzheimer disease, unspecified', category: 'Neurological' },
    { code: 'K76.0', display: 'Fatty (change of) liver, not elsewhere classified', category: 'Gastrointestinal' },
    { code: 'N18.9', display: 'Chronic kidney disease, unspecified', category: 'Renal' },
    { code: 'E78.5', display: 'Disorder of lipoprotein metabolism, unspecified', category: 'Endocrine' },
    { code: 'F41.1', display: 'Anxiety disorder, unspecified', category: 'Mental Health' },
    { code: 'F32.9', display: 'Major depressive disorder, unspecified', category: 'Mental Health' },
    { code: 'R50.9', display: 'Fever, unspecified', category: 'General Symptoms' },
    { code: 'R53.83', display: 'Other fatigue', category: 'General Symptoms' }
  ]

  for (const diagnosis of diagnoses) {
    await prisma.diagnosis.createMany({
      data: diagnosis,
      skipDuplicates: true
    })
  }

  console.log('✅ Comprehensive diagnoses created')

  // Create comprehensive disciplines
  const disciplines = [
    { name: 'Physical Therapy', description: 'Rehabilitation through physical exercise and movement therapy' },
    { name: 'Occupational Therapy', description: 'Helping patients regain daily living skills and independence' },
    { name: 'Speech Therapy', description: 'Communication, language, and swallowing rehabilitation' },
    { name: 'Nursing', description: 'Skilled nursing care, patient monitoring, and care coordination' },
    { name: 'Social Work', description: 'Patient advocacy, resource coordination, and emotional support' },
    { name: 'Respiratory Therapy', description: 'Breathing support and respiratory care management' },
    { name: 'Nutrition', description: 'Dietary guidance and nutritional support planning' },
    { name: 'Wound Care', description: 'Specialized wound treatment and healing management' },
    { name: 'Palliative Care', description: 'Comfort care and quality of life enhancement' },
    { name: 'Case Management', description: 'Care coordination and resource optimization' }
  ]

  for (const discipline of disciplines) {
    await prisma.discipline.createMany({
      data: discipline,
      skipDuplicates: true
    })
  }

  console.log('✅ Comprehensive disciplines created')

  // Create comprehensive payers
  const payers = [
    { name: 'Medicare', type: 'Government' },
    { name: 'Medicaid', type: 'Government' },
    { name: 'Blue Cross Blue Shield', type: 'Commercial' },
    { name: 'Aetna', type: 'Commercial' },
    { name: 'UnitedHealthcare', type: 'Commercial' },
    { name: 'Cigna', type: 'Commercial' },
    { name: 'Humana', type: 'Commercial' },
    { name: 'Kaiser Permanente', type: 'Commercial' },
    { name: 'Anthem', type: 'Commercial' },
    { name: 'Molina Healthcare', type: 'Commercial' }
  ]

  for (const payer of payers) {
    await prisma.payer.createMany({
      data: payer,
      skipDuplicates: true
    })
  }

  console.log('✅ Comprehensive payers created')

  // Create patients for each organization with different counts
  const organizationPatients = [
    // Exponential Healthcare Network - 13 patients
    {
      organizationId: createdOrgs[0].id,
      count: 13,
      prefix: 'EHN'
    },
    // Mercy General Hospital - 10 patients  
    {
      organizationId: createdOrgs[1].id,
      count: 10,
      prefix: 'MGH'
    },
    // Community Care Clinic - 8 patients
    {
      organizationId: createdOrgs[2].id,
      count: 8,
      prefix: 'CCC'
    }
  ]

  const allPatients = []
  for (const orgPatients of organizationPatients) {
    const patients = []
    for (let i = 1; i <= orgPatients.count; i++) {
      const age = Math.floor(Math.random() * 40) + 50 // Ages 50-90
      const gender = Math.random() > 0.5 ? 'M' : 'F'
      const firstName = getRandomFirstName(gender)
      const lastName = getRandomLastName()
      
      patients.push({
        firstName,
        lastName,
        dob: new Date(Date.now() - (age * 365 * 24 * 60 * 60 * 1000)),
        sex: gender,
        age,
        phone: `+1-555-${String(1000 + i).padStart(4, '0')}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${orgPatients.prefix.toLowerCase()}.org`,
        addressLine1: `${Math.floor(Math.random() * 9999) + 1} ${getRandomStreetName()}`,
        city: getRandomCity(),
        state: 'CA',
        postalCode: `${90210 + Math.floor(Math.random() * 20)}`,
        primaryInsurance: getRandomInsurance(),
        emergencyContact: `${getRandomFirstName('M')} ${lastName}`,
        emergencyPhone: `+1-555-${String(2000 + i).padStart(4, '0')}`,
        organizationId: orgPatients.organizationId
      })
    }
    
    // Create patients for this organization
    for (const patient of patients) {
      const createdPatient = await prisma.patient.create({
        data: patient
      })
      allPatients.push(createdPatient)
    }
    
    console.log(`✅ ${orgPatients.count} patients created for ${createdOrgs.find(o => o.id === orgPatients.organizationId)?.name}`)
  }

  // Create referrals for each organization with different counts
  const organizationReferrals = [
    // Exponential Healthcare Network - 8 referrals
    {
      organizationId: createdOrgs[0].id,
      count: 8,
      patientIds: allPatients.filter(p => p.organizationId === createdOrgs[0].id).map(p => p.id)
    },
    // Mercy General Hospital - 6 referrals
    {
      organizationId: createdOrgs[1].id,
      count: 6,
      patientIds: allPatients.filter(p => p.organizationId === createdOrgs[1].id).map(p => p.id)
    },
    // Community Care Clinic - 4 referrals
    {
      organizationId: createdOrgs[2].id,
      count: 4,
      patientIds: allPatients.filter(p => p.organizationId === createdOrgs[2].id).map(p => p.id)
    }
  ]

  for (const orgReferrals of organizationReferrals) {
    const referrals = []
    for (let i = 0; i < orgReferrals.count; i++) {
      const patientId = orgReferrals.patientIds[i]
      const ntaScore = getRandomNTAScore()
      const hmoPlanType = getRandomHMOPlanType()
      const medicareHmoProvider = getRandomMedicareHMOProvider()
      
      referrals.push({
        patientId,
        livesWith: getRandomLivesWith(),
        ecName: getRandomEmergencyContact(),
        ecPhone: `+1-555-${String(3000 + i).padStart(4, '0')}`,
        ecRelation: getRandomRelation(),
        ntaScore,
        hmoPlanType,
        medicareHmoProvider,
        primaryDxCode: getRandomDiagnosisCode(),
        primaryDxText: getRandomDiagnosisText()
      })
    }
    
    // Create referrals for this organization
    for (const referral of referrals) {
      await prisma.referral.create({
        data: referral
      })
    }
    
    console.log(`✅ ${orgReferrals.count} referrals created for ${createdOrgs.find(o => o.id === orgReferrals.organizationId)?.name}`)
  }

  console.log('🎉 Multi-organization database seeding completed successfully!')
  console.log('📧 Superadmin login: admin@exponential.com')
  console.log('🔑 All user passwords: testing123')
  console.log('👥 Users created: 4 (with dual-role system)')
  console.log('🏥 Organizations created: 3')
  console.log('👥 Total patients created: 31')
  console.log('📋 Total referrals created: 18')
  console.log('')
  console.log('🔐 DUAL-ROLE SYSTEM IMPLEMENTED:')
  console.log('   • Global Roles: Control admin panel access')
  console.log('   • Organization Roles: Control org-specific permissions')
  console.log('')
  console.log('👤 USER ROLES SUMMARY:')
  console.log('   • admin@exponential.com: SUPERADMIN (Global) + ORG OWNER/ADMIN/MEMBER')
  console.log('   • dr.sarah@healthcare.org: ADMIN (Global) + ORG OWNER/ADMIN/MEMBER')
  console.log('   • nurse.mike@healthcare.org: ADMIN (Global) + ORG OWNER/ADMIN/MEMBER')
  console.log('   • therapist.lisa@healthcare.org: MEMBER (Global) + ORG VIEWER/MEMBER')
  console.log('⚠️  IMPORTANT: Change passwords in production!')
}

// Helper functions for generating random data
function getRandomFirstName(gender: string): string {
  const maleNames = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Christopher']
  const femaleNames = ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen']
  const names = gender === 'M' ? maleNames : femaleNames
  return names[Math.floor(Math.random() * names.length)]
}

function getRandomLastName(): string {
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']
  return lastNames[Math.floor(Math.random() * lastNames.length)]
}

function getRandomStreetName(): string {
  const streets = ['Oak Street', 'Pine Avenue', 'Maple Drive', 'Cedar Lane', 'Elm Court', 'Birch Road', 'Willow Way', 'Spruce Street']
  return streets[Math.floor(Math.random() * streets.length)]
}

function getRandomCity(): string {
  const cities = ['Medical City', 'Healthcare Valley', 'Wellness Town', 'Health Springs', 'Care Center', 'Medical Heights']
  return cities[Math.floor(Math.random() * cities.length)]
}

function getRandomInsurance(): string {
  const insurances = ['Medicare', 'Blue Cross Blue Shield', 'Aetna', 'UnitedHealthcare', 'Cigna', 'Humana', 'Kaiser Permanente']
  return insurances[Math.floor(Math.random() * insurances.length)]
}

function getRandomNTAScore(): string {
  const scores = ['Low', 'Medium', 'High', 'Very High']
  return scores[Math.floor(Math.random() * scores.length)]
}

function getRandomHMOPlanType(): string {
  const plans = ['Medicare Advantage', 'PPO', 'HMO', 'EPO', 'POS']
  return plans[Math.floor(Math.random() * plans.length)]
}

function getRandomMedicareHMOProvider(): string {
  const providers = ['HUMANA INSURANCE COMPANY', 'BLUE CROSS BLUE SHIELD', 'AETNA', 'UNITEDHEALTHCARE', 'CIGNA', 'KAISER PERMANENTE']
  return providers[Math.floor(Math.random() * providers.length)]
}

function getRandomLivesWith(): string {
  const options = ['Spouse', 'Alone', 'Family', 'Children', 'Caregiver']
  return options[Math.floor(Math.random() * options.length)]
}

function getRandomEmergencyContact(): string {
  const names = ['Michael', 'Lisa', 'David', 'Sarah', 'Robert', 'Jennifer', 'James', 'Patricia', 'John', 'Linda']
  return names[Math.floor(Math.random() * names.length)]
}

function getRandomRelation(): string {
  const relations = ['Spouse', 'Son', 'Daughter', 'Brother', 'Sister', 'Caregiver', 'Friend']
  return relations[Math.floor(Math.random() * relations.length)]
}

function getRandomDiagnosisCode(): string {
  const codes = ['I50.9', 'J44.9', 'E11.9', 'I63.9', 'M79.3', 'I10', 'M81.0', 'G30.9', 'K76.0', 'N18.9']
  return codes[Math.floor(Math.random() * codes.length)]
}

function getRandomDiagnosisText(): string {
  const diagnoses = [
    'Heart failure, unspecified',
    'Chronic obstructive pulmonary disease, unspecified',
    'Type 2 diabetes mellitus without complications',
    'Cerebral infarction, unspecified',
    'Pain in unspecified site',
    'Essential (primary) hypertension',
    'Age-related osteoporosis without current pathological fracture',
    'Alzheimer disease, unspecified',
    'Fatty (change of) liver, not elsewhere classified',
    'Chronic kidney disease, unspecified'
  ]
  return diagnoses[Math.floor(Math.random() * diagnoses.length)]
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    console.error('Stack trace:', e.stack)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
