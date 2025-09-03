import { PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs'

const prisma = new PrismaClient()

// Generate realistic patient data
function generatePatientData(organizationId: string, index: number) {
  const firstNames = [
    'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth',
    'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Christopher', 'Karen',
    'Charles', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony', 'Helen', 'Mark', 'Sandra',
    'Donald', 'Donna', 'Steven', 'Carol', 'Paul', 'Ruth', 'Andrew', 'Sharon', 'Joshua', 'Michelle',
    'Kenneth', 'Laura', 'Kevin', 'Emily', 'Brian', 'Kimberly', 'George', 'Deborah', 'Edward', 'Dorothy',
    'Ronald', 'Lisa', 'Timothy', 'Nancy', 'Jason', 'Karen', 'Jeffrey', 'Betty', 'Ryan', 'Helen',
    'Jacob', 'Sandra', 'Gary', 'Donna', 'Nicholas', 'Carol', 'Eric', 'Ruth', 'Jonathan', 'Sharon',
    'Stephen', 'Michelle', 'Larry', 'Emily', 'Justin', 'Kimberly', 'Scott', 'Deborah', 'Brandon', 'Dorothy',
    'Benjamin', 'Lisa', 'Samuel', 'Nancy', 'Frank', 'Karen', 'Gregory', 'Betty', 'Raymond', 'Helen',
    'Alexander', 'Sandra', 'Patrick', 'Donna', 'Jack', 'Carol', 'Dennis', 'Ruth', 'Jerry', 'Sharon'
  ]
  
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
    'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
    'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
    'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts',
    'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes',
    'Stewart', 'Morris', 'Morales', 'Murphy', 'Rogers', 'Reed', 'Cook', 'Bailey', 'Cooper', 'Richardson',
    'Cox', 'Howard', 'Ward', 'Torres', 'Peterson', 'Gray', 'Ramirez', 'James', 'Watson', 'Brooks',
    'Kelly', 'Sanders', 'Price', 'Bennett', 'Wood', 'Barnes', 'Ross', 'Henderson', 'Coleman', 'Jenkins',
    'Perry', 'Powell', 'Long', 'Patterson', 'Hughes', 'Flores', 'Washington', 'Butler', 'Simmons', 'Foster'
  ]

  const cities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego',
    'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco',
    'Indianapolis', 'Seattle', 'Denver', 'Washington', 'Boston', 'El Paso', 'Nashville', 'Detroit',
    'Oklahoma City', 'Portland', 'Las Vegas', 'Memphis', 'Louisville', 'Baltimore', 'Milwaukee'
  ]

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA',
    'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT',
    'VA', 'WA', 'WV', 'WI', 'WY'
  ]

  const diagnoses = [
    'Type 2 Diabetes Mellitus', 'Essential Hypertension', 'Chronic Obstructive Pulmonary Disease',
    'Congestive Heart Failure', 'Chronic Kidney Disease', 'Osteoarthritis', 'Depression',
    'Anxiety Disorder', 'Asthma', 'Coronary Artery Disease', 'Atrial Fibrillation',
    'Peripheral Vascular Disease', 'Dementia', 'Parkinson\'s Disease', 'Multiple Sclerosis',
    'Rheumatoid Arthritis', 'Lupus', 'Fibromyalgia', 'Migraine', 'Epilepsy'
  ]

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  const age = Math.floor(Math.random() * 50) + 50 // 50-100 years old
  const city = cities[Math.floor(Math.random() * cities.length)]
  const state = states[Math.floor(Math.random() * states.length)]
  const postalCode = Math.floor(Math.random() * 90000) + 10000
  const primaryDiagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)]
  const medicalRecordNumber = `MRN${organizationId.slice(0, 8)}${index.toString().padStart(4, '0')}`

  return {
    firstName,
    lastName,
    age,
    organizationId,
    addressLine1: `${Math.floor(Math.random() * 9999) + 1} ${['Oak', 'Maple', 'Pine', 'Elm', 'Cedar'][Math.floor(Math.random() * 5)]} St`,
    city,
    state,
    postalCode: postalCode.toString(),
    phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    dob: new Date(Date.now() - (age * 365 * 24 * 60 * 60 * 1000)),
    sex: ['M', 'F'][Math.floor(Math.random() * 2)],
    height: `${Math.floor(Math.random() * 2) + 5}'${Math.floor(Math.random() * 12)}"`,
    weight: `${Math.floor(Math.random() * 100) + 100} lb`,
    emergencyContact: `${['Spouse', 'Daughter', 'Son', 'Friend'][Math.floor(Math.random() * 4)]} Contact`,
    emergencyPhone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    medicalRecordNumber,
    status: ['active', 'inactive', 'discharged'][Math.floor(Math.random() * 3)]
  }
}

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data
  console.log('🧹 Clearing existing data...')
  await prisma.referralCoverage.deleteMany()
  await prisma.referralDiagnosis.deleteMany()
  await prisma.referralService.deleteMany()
  await prisma.referral.deleteMany()
  await prisma.patient.deleteMany()
  await prisma.userOrganization.deleteMany()
  await prisma.user.deleteMany()
  await prisma.organization.deleteMany()
  await prisma.service.deleteMany()
  await prisma.diagnosis.deleteMany()
  await prisma.payer.deleteMany()
  await prisma.session.deleteMany()

  // Create Organizations
  console.log('🏢 Creating organizations...')
  const createdOrgs = []
  const orgNames = [
    'Exponential Healthcare Solutions',
    'Sunrise Medical Group',
    'Mercy Health Partners',
    'Advanced Care Network',
    'Community Health Alliance'
  ]

  for (const name of orgNames) {
    const org = await prisma.organization.create({
      data: {
        name,
        type: ['Hospital', 'Clinic', 'Home Health', 'Specialty Center', 'Multi-Specialty'][Math.floor(Math.random() * 5)],
        address: `${Math.floor(Math.random() * 9999) + 1} ${['Medical', 'Health', 'Care', 'Wellness', 'Healing'][Math.floor(Math.random() * 5)]} Blvd`,
        city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][Math.floor(Math.random() * 5)],
        state: ['NY', 'CA', 'IL', 'TX', 'AZ'][Math.floor(Math.random() * 5)],
        zipCode: (Math.floor(Math.random() * 90000) + 10000).toString(),
        phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        website: `https://www.${name.toLowerCase().replace(/\s+/g, '')}.com`
      }
    })
    createdOrgs.push(org)
    console.log(`✅ Created organization: ${org.name}`)
  }

  // Create Users
  console.log('👥 Creating users...')
  const createdUsers = []
  const userEmails = [
    'admin@exponential.com',
    'doctor@sunrise.com',
    'nurse@mercy.com',
    'therapist@advanced.com',
    'coordinator@community.com'
  ]

  for (let i = 0; i < userEmails.length; i++) {
    const hashedPassword = await bcryptjs.hash('testing', 10)
    const user = await prisma.user.create({
      data: {
        email: userEmails[i],
        name: `${['Admin', 'Dr.', 'Nurse', 'Therapist', 'Coordinator'][i]} ${['User', 'Smith', 'Johnson', 'Williams', 'Brown'][i]}`,
        password: hashedPassword
      }
    })
    createdUsers.push(user)
    console.log(`✅ Created user: ${user.email}`)
  }

  // Create User-Organization relationships - each user in multiple organizations
  console.log('🔗 Linking users to multiple organizations...')
  
  // Define which organizations each user will be part of
  const userOrgMappings = [
    // admin@exponential.com - in 3 organizations
    [
      { userId: 0, organizationId: 0, role: 'admin' },      // Exponential (primary)
      { userId: 0, organizationId: 1, role: 'consultant' }, // Sunrise
      { userId: 0, organizationId: 2, role: 'advisor' }     // Mercy
    ],
    // doctor@sunrise.com - in 2 organizations
    [
      { userId: 1, organizationId: 1, role: 'doctor' },     // Sunrise (primary)
      { userId: 1, organizationId: 3, role: 'consultant' }  // Advanced Care
    ],
    // nurse@mercy.com - in 3 organizations
    [
      { userId: 2, organizationId: 2, role: 'nurse' },      // Mercy (primary)
      { userId: 2, organizationId: 0, role: 'nurse' },     // Exponential
      { userId: 2, organizationId: 4, role: 'supervisor' }  // Community Health
    ],
    // therapist@advanced.com - in 2 organizations
    [
      { userId: 3, organizationId: 3, role: 'therapist' },   // Advanced Care (primary)
      { userId: 3, organizationId: 1, role: 'consultant' }  // Sunrise
    ],
    // coordinator@community.com - in 3 organizations
    [
      { userId: 4, organizationId: 4, role: 'coordinator' }, // Community Health (primary)
      { userId: 4, organizationId: 0, role: 'coordinator' }, // Exponential
      { userId: 4, organizationId: 2, role: 'coordinator' }  // Mercy
    ]
  ]

  for (const userOrgs of userOrgMappings) {
    for (const userOrg of userOrgs) {
      await prisma.userOrganization.create({
        data: {
          userId: createdUsers[userOrg.userId].id,
          organizationId: createdOrgs[userOrg.organizationId].id,
          role: userOrg.role,
          isActive: true,
          joinedAt: new Date()
        }
      })
      console.log(`✅ Linked ${createdUsers[userOrg.userId].email} to ${createdOrgs[userOrg.organizationId].name} as ${userOrg.role}`)
    }
  }

  // Create Patients for each organization with completely different counts
  console.log('🏥 Creating patients...')
  const patientCounts = [8, 23, 17, 31, 12] // Completely different patient counts for each org
  
  for (let orgIndex = 0; orgIndex < createdOrgs.length; orgIndex++) {
    const org = createdOrgs[orgIndex]
    const patientCount = patientCounts[orgIndex]
    
    for (let i = 0; i < patientCount; i++) {
      const patientData = generatePatientData(org.id, i)
      
      try {
        const patient = await prisma.patient.upsert({
          where: { medicalRecordNumber: patientData.medicalRecordNumber },
          update: {},
          create: patientData
        })
        console.log(`✅ Created patient: ${patient.firstName} ${patient.lastName} for ${org.name}`)
      } catch (error) {
        console.log(`⚠️ Skipped patient ${patientData.firstName} ${patientData.lastName} (likely duplicate)`)
      }
    }
    console.log(`✅ Created ${patientCount} patients for ${org.name}`)
  }

  // Create basic reference data for dashboard functionality
  console.log('📋 Creating reference data...')
  
  // Create Services
  const services = [
    { name: 'Home Health Nursing', category: 'Home Health', description: 'Skilled nursing care in the home' },
    { name: 'Physical Therapy', category: 'Therapy', description: 'Physical rehabilitation services' },
    { name: 'Occupational Therapy', category: 'Therapy', description: 'Daily living skills therapy' },
    { name: 'Speech Therapy', category: 'Therapy', description: 'Communication and swallowing therapy' },
    { name: 'Medical Social Work', category: 'Support', description: 'Social and emotional support services' }
  ]

  const createdServices = []
  for (const serviceData of services) {
    const service = await prisma.service.create({
      data: serviceData
    })
    createdServices.push(service)
  }
  console.log('✅ Created services')

  // Create Diagnoses
  const diagnoses = [
    { code: 'E11.9', display: 'Type 2 diabetes mellitus without complications', category: 'Endocrine' },
    { code: 'I10', display: 'Essential (primary) hypertension', category: 'Cardiovascular' },
    { code: 'E66.9', display: 'Obesity, unspecified', category: 'Endocrine' },
    { code: 'J44.9', display: 'Chronic obstructive pulmonary disease, unspecified', category: 'Respiratory' },
    { code: 'I25.10', display: 'Atherosclerotic heart disease without angina pectoris', category: 'Cardiovascular' }
  ]

  for (const diagnosisData of diagnoses) {
    await prisma.diagnosis.upsert({
      where: { code: diagnosisData.code },
      update: {},
      create: diagnosisData
    })
  }
  console.log('✅ Created diagnoses')

  // Create Payers
  const payers = [
    { name: 'Medicare', type: 'Government' },
    { name: 'Medicaid', type: 'Government' },
    { name: 'Blue Cross Blue Shield', type: 'Commercial' },
    { name: 'Aetna', type: 'Commercial' },
    { name: 'UnitedHealth', type: 'Commercial' }
  ]

  for (const payerData of payers) {
    await prisma.payer.upsert({
      where: { name: payerData.name },
      update: {},
      create: payerData
    })
  }
  console.log('✅ Created payers')

  // Create referrals for each organization's patients with completely different counts
  console.log('📝 Creating referrals for each organization...')
  const referralPercentages = [0.62, 0.78, 0.53, 0.87, 0.41] // Completely different referral rates for each org
  
  for (let orgIndex = 0; orgIndex < createdOrgs.length; orgIndex++) {
    const org = createdOrgs[orgIndex]
    console.log(`🏥 Creating referrals for ${org.name}...`)
    
    // Get all patients for this organization
    const orgPatients = await prisma.patient.findMany({
      where: { organizationId: org.id }
    })
    
    // Create referrals for different percentages of patients in each organization
    const referralCount = Math.floor(orgPatients.length * referralPercentages[orgIndex])
    const patientsToRefer = orgPatients.slice(0, referralCount)
    
    for (let i = 0; i < patientsToRefer.length; i++) {
      const patient = patientsToRefer[i]
      
      try {
        const referral = await prisma.referral.create({
          data: {
            patientId: patient.id,
            livesWith: ['Spouse', 'Alone', 'Family'][Math.floor(Math.random() * 3)],
            ecName: patient.emergencyContact || 'Emergency Contact',
            ecPhone: patient.emergencyPhone || '+1-555-000-0000',
            ecRelation: ['Spouse', 'Daughter', 'Son', 'Friend'][Math.floor(Math.random() * 4)],
            ntaScore: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
            hmoPlanType: ['HMO', 'PPO', 'Medicare Advantage'][Math.floor(Math.random() * 3)],
            medicareHmoProvider: ['HUMANA', 'AETNA', 'UNITEDHEALTH'][Math.floor(Math.random() * 3)],
            primaryDxCode: diagnoses[Math.floor(Math.random() * diagnoses.length)].code,
            primaryDxText: diagnoses[Math.floor(Math.random() * diagnoses.length)].display
          }
        })

        // Add some services to the referral
        const randomServices = createdServices.slice(0, Math.floor(Math.random() * 3) + 1)
        for (const service of randomServices) {
          await prisma.referralService.create({
            data: {
              referralId: referral.id,
              serviceId: service.id,
              status: ['pending', 'approved', 'completed'][Math.floor(Math.random() * 3)]
            }
          })
        }

        // Add some diagnoses to the referral
        const randomDiagnoses = diagnoses.slice(0, Math.floor(Math.random() * diagnoses.length))
        for (let j = 0; j < randomDiagnoses.length; j++) {
          await prisma.referralDiagnosis.create({
            data: {
              referralId: referral.id,
              diagnosisId: (await prisma.diagnosis.findUnique({ where: { code: randomDiagnoses[j].code } }))!.id,
              isPrimary: j === 0 // First diagnosis is primary
            }
          })
        }

        // Add some coverage to the referral
        const randomPayer = payers[Math.floor(Math.random() * payers.length)]
        await prisma.referralCoverage.create({
          data: {
            referralId: referral.id,
            payerId: (await prisma.payer.findUnique({ where: { name: randomPayer.name } }))!.id,
            policyNumber: `POL${Math.floor(Math.random() * 900000) + 100000}`,
            groupNumber: `GRP${Math.floor(Math.random() * 90000) + 10000}`,
            status: ['pending', 'approved', 'denied'][Math.floor(Math.random() * 3)]
          }
        })

        console.log(`✅ Created referral for ${patient.firstName} ${patient.lastName} in ${org.name}`)
      } catch (error) {
        console.log(`⚠️ Failed to create referral for ${patient.firstName} ${patient.lastName}: ${error}`)
      }
    }
    
    console.log(`✅ Created ${patientsToRefer.length} referrals for ${org.name} (${Math.round(referralPercentages[orgIndex] * 100)}% of patients)`)
  }

  console.log('🎉 Database seeding completed successfully!')
  console.log('\n📊 Summary of created data:')
  console.log('🏢 Organizations: 5')
  console.log('👥 Users: 5 (each in 2-3 organizations)')
  console.log('🏥 Patients: 8, 23, 17, 31, 12 (different for each org)')
  console.log('📝 Referrals: Varying percentages (62%, 78%, 53%, 87%, 41%)')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
