import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  console.log('Seeding database with healthcare data...')
  
  try {
    // Create organizations
    const organizations = await Promise.all([
      prisma.organization.upsert({
        where: { name: 'Exponential Healthcare Solutions' },
        update: {},
        create: {
          name: 'Exponential Healthcare Solutions',
        },
      }),
      prisma.organization.upsert({
        where: { name: 'Advanced Care Partners' },
        update: {},
        create: {
          name: 'Advanced Care Partners',
        },
      }),
      prisma.organization.upsert({
        where: { name: 'Mercy Health Network' },
        update: {},
        create: {
          name: 'Mercy Health Network',
        },
      }),
      prisma.organization.upsert({
        where: { name: 'St. Mary\'s Medical Center' },
        update: {},
        create: {
          name: 'St. Mary\'s Medical Center',
        },
      }),
      prisma.organization.upsert({
        where: { name: 'Community Care Alliance' },
        update: {},
        create: {
          name: 'Community Care Alliance',
        },
      }),
      prisma.organization.upsert({
        where: { name: 'Regional Health Partners' },
        update: {},
        create: {
          name: 'Regional Health Partners',
        },
      }),
      prisma.organization.upsert({
        where: { name: 'Metropolitan Healthcare Group' },
        update: {},
        create: {
          name: 'Metropolitan Healthcare Group',
        },
      }),
      prisma.organization.upsert({
        where: { name: 'Valley Medical Associates' },
        update: {},
        create: {
          name: 'Valley Medical Associates',
        },
      }),
      prisma.organization.upsert({
        where: { name: 'Coastal Health Systems' },
        update: {},
        create: {
          name: 'Coastal Health Systems',
        },
      }),
      prisma.organization.upsert({
        where: { name: 'Summit Healthcare Solutions' },
        update: {},
        create: {
          name: 'Summit Healthcare Solutions',
        },
      })
    ])

    const [org1, org2, org3, org4, org5, org6, org7, org8, org9, org10] = organizations

    // Create users with random organizations
    const user1 = await prisma.user.upsert({
      where: { email: 'admin@exponential.com' },
      update: {},
      create: {
        email: 'admin@exponential.com',
        name: 'Dr. Sarah Chen',
        password: 'hashedpassword123',
        organizationId: org1.id,
      },
    })

    const user2 = await prisma.user.upsert({
      where: { email: 'nurse@exponential.com' },
      update: {},
      create: {
        email: 'nurse@exponential.com',
        name: 'Nurse Michael Rodriguez',
        password: 'hashedpassword456',
        organizationId: org2.id,
      },
    })

    const user3 = await prisma.user.upsert({
      where: { email: 'coordinator@advanced.com' },
      update: {},
      create: {
        email: 'coordinator@advanced.com',
        name: 'Care Coordinator Lisa Thompson',
        password: 'hashedpassword789',
        organizationId: org3.id,
      },
    })

    // Add more users with random organizations
    const additionalUsers = await Promise.all([
      prisma.user.upsert({
        where: { email: 'doctor@mercy.com' },
        update: {},
        create: {
          email: 'doctor@mercy.com',
          name: 'Dr. James Wilson',
          password: 'hashedpassword101',
          organizationId: org4.id,
        },
      }),
      prisma.user.upsert({
        where: { email: 'nurse@community.com' },
        update: {},
        create: {
          email: 'nurse@community.com',
          name: 'Nurse Emily Davis',
          password: 'hashedpassword102',
          organizationId: org5.id,
        },
      }),
      prisma.user.upsert({
        where: { email: 'coordinator@regional.com' },
        update: {},
        create: {
          email: 'coordinator@regional.com',
          name: 'Care Coordinator Robert Johnson',
          password: 'hashedpassword103',
          organizationId: org6.id,
        },
      }),
      prisma.user.upsert({
        where: { email: 'therapist@metro.com' },
        update: {},
        create: {
          email: 'therapist@metro.com',
          name: 'Physical Therapist Maria Garcia',
          password: 'hashedpassword104',
          organizationId: org7.id,
        },
      }),
      prisma.user.upsert({
        where: { email: 'nurse@valley.com' },
        update: {},
        create: {
          email: 'nurse@valley.com',
          name: 'Nurse David Brown',
          password: 'hashedpassword105',
          organizationId: org8.id,
        },
      }),
      prisma.user.upsert({
        where: { email: 'coordinator@coastal.com' },
        update: {},
        create: {
          email: 'coordinator@coastal.com',
          name: 'Care Coordinator Jennifer Lee',
          password: 'hashedpassword106',
          organizationId: org9.id,
        },
      }),
      prisma.user.upsert({
        where: { email: 'doctor@summit.com' },
        update: {},
        create: {
          email: 'doctor@summit.com',
          name: 'Dr. Amanda Taylor',
          password: 'hashedpassword107',
          organizationId: org10.id,
        },
      })
    ])

    // Create services
    const services = await Promise.all([
      prisma.service.upsert({
        where: { key: 'CATHETER' },
        update: {},
        create: { key: 'CATHETER', label: 'Catheter Care', category: 'Medical Supplies' },
      }),
      prisma.service.upsert({
        where: { key: 'OSTOMY' },
        update: {},
        create: { key: 'OSTOMY', label: 'Ostomy Care', category: 'Medical Supplies' },
      }),
      prisma.service.upsert({
        where: { key: 'DRAIN' },
        update: {},
        create: { key: 'DRAIN', label: 'Drain Management', category: 'Medical Supplies' },
      }),
      prisma.service.upsert({
        where: { key: 'WOUND' },
        update: {},
        create: { key: 'WOUND', label: 'Wound Care', category: 'Medical Supplies' },
      }),
      prisma.service.upsert({
        where: { key: 'WOUND_VAC' },
        update: {},
        create: { key: 'WOUND_VAC', label: 'Wound Vacuum Therapy', category: 'Medical Supplies' },
      }),
      prisma.service.upsert({
        where: { key: 'IV_FLUIDS' },
        update: {},
        create: { key: 'IV_FLUIDS', label: 'IV Fluid Therapy', category: 'Medical Supplies' },
      }),
    ])

    // Create payers
    const payers = await Promise.all([
      prisma.payer.upsert({
        where: { name: 'Humana Insurance Company' },
        update: {},
        create: { name: 'Humana Insurance Company', naic: '12345' },
      }),
      prisma.payer.upsert({
        where: { name: 'Aetna Health Insurance' },
        update: {},
        create: { name: 'Aetna Health Insurance', naic: '67890' },
      }),
      prisma.payer.upsert({
        where: { name: 'Blue Cross Blue Shield' },
        update: {},
        create: { name: 'Blue Cross Blue Shield', naic: '11111' },
      }),
      prisma.payer.upsert({
        where: { name: 'Medicare' },
        update: {},
        create: { name: 'Medicare', naic: '22222' },
      }),
    ])

    // Create plans
    const plans = await Promise.all([
      prisma.plan.upsert({
        where: { id: 'plan-1' },
        update: {},
        create: {
          id: 'plan-1',
          payerId: payers[0].id, // Humana
          name: 'HUMANA CHOICE MEDICARE',
          planType: 'HMO',
          isMedicare: true,
        },
      }),
      prisma.plan.upsert({
        where: { id: 'plan-2' },
        update: {},
        create: {
          id: 'plan-2',
          payerId: payers[1].id, // Aetna
          name: 'AETNA MEDICARE ADVANTAGE',
          planType: 'PPO',
          isMedicare: true,
        },
      }),
      prisma.plan.upsert({
        where: { id: 'plan-3' },
        update: {},
        create: {
          id: 'plan-3',
          payerId: payers[2].id, // BCBS
          name: 'BLUE CROSS MEDICARE SUPPLEMENT',
          planType: 'Supplement',
          isMedicare: true,
        },
      }),
    ])

    // Create disciplines
    const disciplines = await Promise.all([
      prisma.discipline.upsert({
        where: { key: 'SN' },
        update: {},
        create: { key: 'SN', name: 'Skilled Nursing' },
      }),
      prisma.discipline.upsert({
        where: { key: 'PT' },
        update: {},
        create: { key: 'PT', name: 'Physical Therapy' },
      }),
      prisma.discipline.upsert({
        where: { key: 'OT' },
        update: {},
        create: { key: 'OT', name: 'Occupational Therapy' },
      }),
      prisma.discipline.upsert({
        where: { key: 'SLP' },
        update: {},
        create: { key: 'SLP', name: 'Speech Language Pathology' },
      }),
    ])

    // Create diagnoses - Common medical conditions
    const diagnoses = await Promise.all([
      // Cardiovascular
      prisma.diagnosis.upsert({
        where: { code: 'I10' },
        update: {},
        create: { code: 'I10', display: 'Essential (primary) hypertension', category: 'Cardiovascular' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'I50.9' },
        update: {},
        create: { code: 'I50.9', display: 'Heart failure, unspecified', category: 'Cardiovascular' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'I25.10' },
        update: {},
        create: { code: 'I25.10', display: 'Atherosclerotic heart disease of native coronary artery without angina pectoris', category: 'Cardiovascular' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'I48.91' },
        update: {},
        create: { code: 'I48.91', display: 'Unspecified atrial fibrillation', category: 'Cardiovascular' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'I70.9' },
        update: {},
        create: { code: 'I70.9', display: 'Generalized atherosclerosis', category: 'Cardiovascular' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'I47.1' },
        update: {},
        create: { code: 'I47.1', display: 'Supraventricular tachycardia', category: 'Cardiovascular' },
      }),
      
      // Endocrine
      prisma.diagnosis.upsert({
        where: { code: 'E11.9' },
        update: {},
        create: { code: 'E11.9', display: 'Type 2 diabetes mellitus without complications', category: 'Endocrine' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'E11.21' },
        update: {},
        create: { code: 'E11.21', display: 'Type 2 diabetes mellitus with diabetic nephropathy', category: 'Endocrine' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'E11.22' },
        update: {},
        create: { code: 'E11.22', display: 'Type 2 diabetes mellitus with diabetic chronic kidney disease', category: 'Endocrine' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'E11.65' },
        update: {},
        create: { code: 'E11.65', display: 'Type 2 diabetes mellitus with hyperglycemia', category: 'Endocrine' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'E03.9' },
        update: {},
        create: { code: 'E03.9', display: 'Hypothyroidism, unspecified', category: 'Endocrine' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'E78.5' },
        update: {},
        create: { code: 'E78.5', display: 'Disorder of lipoprotein metabolism, unspecified', category: 'Endocrine' },
      }),
      
      // Respiratory
      prisma.diagnosis.upsert({
        where: { code: 'J44.9' },
        update: {},
        create: { code: 'J44.9', display: 'Chronic obstructive pulmonary disease, unspecified', category: 'Respiratory' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'J45.909' },
        update: {},
        create: { code: 'J45.909', display: 'Unspecified asthma with (acute) exacerbation', category: 'Respiratory' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'J47' },
        update: {},
        create: { code: 'J47', display: 'Bronchiectasis', category: 'Respiratory' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'J84.9' },
        update: {},
        create: { code: 'J84.9', display: 'Interstitial lung disease, unspecified', category: 'Respiratory' },
      }),
      
      // Genitourinary
      prisma.diagnosis.upsert({
        where: { code: 'N30.90' },
        update: {},
        create: { code: 'N30.90', display: 'Cystitis, unspecified without hematuria', category: 'Genitourinary' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'N18.9' },
        update: {},
        create: { code: 'N18.9', display: 'Chronic kidney disease, unspecified', category: 'Genitourinary' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'N39.0' },
        update: {},
        create: { code: 'N39.0', display: 'Urinary tract infection, site not specified', category: 'Genitourinary' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'N40' },
        update: {},
        create: { code: 'N40', display: 'Benign prostatic hyperplasia', category: 'Genitourinary' },
      }),
      
      // Skin
      prisma.diagnosis.upsert({
        where: { code: 'L89.9' },
        update: {},
        create: { code: 'L89.9', display: 'Pressure ulcer of unspecified site, unspecified stage', category: 'Skin' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'L89.3' },
        update: {},
        create: { code: 'L89.3', display: 'Pressure ulcer of sacral region', category: 'Skin' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'L89.2' },
        update: {},
        create: { code: 'L89.2', display: 'Pressure ulcer of hip', category: 'Skin' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'L02.91' },
        update: {},
        create: { code: 'L02.91', display: 'Cutaneous abscess, unspecified', category: 'Skin' },
      }),
      
      // Musculoskeletal
      prisma.diagnosis.upsert({
        where: { code: 'M62.9' },
        update: {},
        create: { code: 'M62.9', display: 'Muscle weakness, unspecified', category: 'Musculoskeletal' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'M79.3' },
        update: {},
        create: { code: 'M79.3', display: 'Pain in unspecified wrist and hand', category: 'Musculoskeletal' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'M79.1' },
        update: {},
        create: { code: 'M79.1', display: 'Myalgia', category: 'Musculoskeletal' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'M81.0' },
        update: {},
        create: { code: 'M81.0', display: 'Age-related osteoporosis without current pathological fracture', category: 'Musculoskeletal' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'M17.9' },
        update: {},
        create: { code: 'M17.9', display: 'Osteoarthritis of knee, unspecified', category: 'Musculoskeletal' },
      }),
      
      // Neurological
      prisma.diagnosis.upsert({
        where: { code: 'G91.9' },
        update: {},
        create: { code: 'G91.9', display: 'Hydrocephalus, unspecified', category: 'Neurological' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'G30.9' },
        update: {},
        create: { code: 'G30.9', display: 'Alzheimer\'s disease, unspecified', category: 'Neurological' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'I63.9' },
        update: {},
        create: { code: 'I63.9', display: 'Cerebral infarction, unspecified', category: 'Neurological' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'G20' },
        update: {},
        create: { code: 'G20', display: 'Parkinson\'s disease', category: 'Neurological' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'G40.909' },
        update: {},
        create: { code: 'G40.909', display: 'Epilepsy, unspecified, not intractable, without status epilepticus', category: 'Neurological' },
      }),
      
      // Gastrointestinal
      prisma.diagnosis.upsert({
        where: { code: 'K91.3' },
        update: {},
        create: { code: 'K91.3', display: 'Postprocedural intestinal obstruction', category: 'Gastrointestinal' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'K59.0' },
        update: {},
        create: { code: 'K59.0', display: 'Constipation, unspecified', category: 'Gastrointestinal' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'K29.70' },
        update: {},
        create: { code: 'K29.70', display: 'Gastritis, unspecified, without bleeding', category: 'Gastrointestinal' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'K92.2' },
        update: {},
        create: { code: 'K92.2', display: 'Gastrointestinal hemorrhage, unspecified', category: 'Gastrointestinal' },
      }),
      
      // Mental Health
      prisma.diagnosis.upsert({
        where: { code: 'F32.9' },
        update: {},
        create: { code: 'F32.9', display: 'Major depressive disorder, unspecified', category: 'Mental Health' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'F41.1' },
        update: {},
        create: { code: 'F41.1', display: 'Generalized anxiety disorder', category: 'Mental Health' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'F03.90' },
        update: {},
        create: { code: 'F03.90', display: 'Unspecified dementia without behavioral disturbance', category: 'Mental Health' },
      }),
      
      // Other Common Conditions
      prisma.diagnosis.upsert({
        where: { code: 'E66.9' },
        update: {},
        create: { code: 'E66.9', display: 'Obesity, unspecified', category: 'Metabolic' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'Z51.11' },
        update: {},
        create: { code: 'Z51.11', display: 'Encounter for antineoplastic chemotherapy', category: 'Oncology' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'S72.9' },
        update: {},
        create: { code: 'S72.9', display: 'Fracture of femur, unspecified', category: 'Trauma' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'Z79.4' },
        update: {},
        create: { code: 'Z79.4', display: 'Long term (current) drug therapy, use of antineoplastic agents', category: 'Oncology' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'Z90.9' },
        update: {},
        create: { code: 'Z90.9', display: 'Acquired absence of unspecified organ', category: 'Post-procedural' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'Z95.1' },
        update: {},
        create: { code: 'Z95.1', display: 'Presence of aortocoronary bypass graft', category: 'Post-procedural' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'Z95.2' },
        update: {},
        create: { code: 'Z95.2', display: 'Presence of prosthetic heart valve', category: 'Post-procedural' },
      }),
      prisma.diagnosis.upsert({
        where: { code: 'Z99.2' },
        update: {},
        create: { code: 'Z99.2', display: 'Dependence on renal dialysis', category: 'Post-procedural' },
      }),
    ])

    // Create medications
    const medications = await Promise.all([
      prisma.medication.upsert({
        where: { name: 'Metformin' },
        update: {},
        create: { name: 'Metformin', code: 'RX6809' },
      }),
      prisma.medication.upsert({
        where: { name: 'Lisinopril' },
        update: {},
        create: { name: 'Lisinopril', code: 'RX6478' },
      }),
      prisma.medication.upsert({
        where: { name: 'Atorvastatin' },
        update: {},
        create: { name: 'Atorvastatin', code: 'RX3654' },
      }),
    ])

    // Create patients
    const patients = await Promise.all([
      prisma.patient.upsert({
        where: { id: 'patient-1' },
        update: {},
        create: {
          id: 'patient-1',
          organizationId: org1.id,
          firstName: 'Margaret',
          lastName: 'Johnson',
          dob: new Date('1945-03-15'),
          sex: 'F',
          height: '5\'4"',
          weight: '145 lb',
          phone: '(555) 123-4567',
          email: 'margaret.johnson@email.com',
          addressLine1: '123 Oak Street',
          city: 'Springfield',
          state: 'IL',
          postalCode: '62701',
          country: 'USA',
        },
      }),
      prisma.patient.upsert({
        where: { id: 'patient-2' },
        update: {},
        create: {
          id: 'patient-2',
          organizationId: org1.id,
          firstName: 'Robert',
          lastName: 'Williams',
          dob: new Date('1952-07-22'),
          sex: 'M',
          height: '5\'10"',
          weight: '180 lb',
          phone: '(555) 234-5678',
          email: 'robert.williams@email.com',
          addressLine1: '456 Maple Avenue',
          city: 'Springfield',
          state: 'IL',
          postalCode: '62701',
          country: 'USA',
        },
      }),
      prisma.patient.upsert({
        where: { id: 'patient-3' },
        update: {},
        create: {
          id: 'patient-3',
          organizationId: org2.id,
          firstName: 'Dorothy',
          lastName: 'Davis',
          dob: new Date('1938-11-08'),
          sex: 'F',
          height: '5\'2"',
          weight: '125 lb',
          phone: '(555) 345-6789',
          email: 'dorothy.davis@email.com',
          addressLine1: '789 Pine Road',
          city: 'Chicago',
          state: 'IL',
          postalCode: '60601',
          country: 'USA',
        },
      }),
    ])

    // Create emergency contacts
    await Promise.all([
      prisma.emergencyContact.create({
        data: {
          patientId: patients[0].id,
          name: 'Thomas Johnson',
          phone: '(555) 123-4568',
          relation: 'Son',
        },
      }),
      prisma.emergencyContact.create({
        data: {
          patientId: patients[1].id,
          name: 'Jennifer Williams',
          phone: '(555) 234-5679',
          relation: 'Daughter',
        },
      }),
      prisma.emergencyContact.create({
        data: {
          patientId: patients[2].id,
          name: 'James Davis',
          phone: '(555) 345-6790',
          relation: 'Son',
        },
      }),
    ])

    // Create referrals
    const referrals = await Promise.all([
      prisma.referral.create({
        data: {
          patientId: patients[0].id,
          livesWith: 'Alone',
          ecName: 'Thomas Johnson',
          ecPhone: '(555) 123-4568',
          ecRelation: 'Son',
          ntaScore: 'Medium',
          hmoPlanType: 'HMO',
          medicareHmoProvider: 'HUMANA INSURANCE COMPANY',
          primaryDxCode: 'I10',
          primaryDxText: 'Essential (primary) hypertension',
        },
      }),
      prisma.referral.create({
        data: {
          patientId: patients[1].id,
          livesWith: 'Spouse',
          ecName: 'Jennifer Williams',
          ecPhone: '(555) 234-5679',
          ecRelation: 'Daughter',
          ntaScore: 'High',
          hmoPlanType: 'PPO',
          medicareHmoProvider: 'AETNA HEALTH INSURANCE',
          primaryDxCode: 'E11.9',
          primaryDxText: 'Type 2 diabetes mellitus without complications',
        },
      }),
      prisma.referral.create({
        data: {
          patientId: patients[2].id,
          livesWith: 'Son',
          ecName: 'James Davis',
          ecPhone: '(555) 345-6790',
          ecRelation: 'Son',
          ntaScore: 'Low',
          hmoPlanType: 'Supplement',
          medicareHmoProvider: 'BLUE CROSS BLUE SHIELD',
          primaryDxCode: 'L89.9',
          primaryDxText: 'Pressure ulcer of unspecified site, unspecified stage',
        },
      }),
    ])

    // Create referral coverages
    await Promise.all([
      prisma.referralCoverage.create({
        data: {
          referralId: referrals[0].id,
          planId: plans[0].id,
          role: 'PRIMARY',
        },
      }),
      prisma.referralCoverage.create({
        data: {
          referralId: referrals[1].id,
          planId: plans[1].id,
          role: 'PRIMARY',
        },
      }),
      prisma.referralCoverage.create({
        data: {
          referralId: referrals[2].id,
          planId: plans[2].id,
          role: 'PRIMARY',
        },
      }),
    ])

    // Create referral services
    await Promise.all([
      prisma.referralService.create({
        data: {
          referralId: referrals[0].id,
          serviceId: services[0].id, // CATHETER
          present: true,
          detail: 'Indwelling catheter',
          notes: 'Patient requires assistance with catheter care',
        },
      }),
      prisma.referralService.create({
        data: {
          referralId: referrals[0].id,
          serviceId: services[3].id, // WOUND
          present: true,
          detail: 'Stage 2 pressure ulcer',
          notes: 'Wound on sacrum, requires daily dressing changes',
        },
      }),
      prisma.referralService.create({
        data: {
          referralId: referrals[1].id,
          serviceId: services[5].id, // IV_FLUIDS
          present: true,
          detail: 'Daily IV hydration',
          notes: 'Patient has difficulty maintaining hydration',
        },
      }),
      prisma.referralService.create({
        data: {
          referralId: referrals[2].id,
          serviceId: services[4].id, // WOUND_VAC
          present: true,
          detail: 'Wound vacuum therapy',
          notes: 'Complex wound requiring negative pressure therapy',
        },
      }),
    ])

    // Create referral diagnoses - Multiple diagnoses per referral
    await Promise.all([
      // Referral 1: Hypertension (Primary) + Multiple comorbidities
      prisma.referralDiagnosis.create({
        data: {
          referralId: referrals[0].id,
          dxCode: 'I10', // Primary diagnosis
          dxText: 'Essential (primary) hypertension',
          isPrimary: true,
        },
      }),
      prisma.referralDiagnosis.create({
        data: {
          referralId: referrals[0].id,
          dxCode: 'E11.9',
          dxText: 'Type 2 diabetes mellitus without complications',
          isPrimary: false,
        },
      }),
      prisma.referralDiagnosis.create({
        data: {
          referralId: referrals[0].id,
          dxCode: 'E66.9',
          dxText: 'Obesity, unspecified',
          isPrimary: false,
        },
      }),

      // Referral 2: Diabetes (Primary) + Multiple comorbidities
      prisma.referralDiagnosis.create({
        data: {
          referralId: referrals[1].id,
          dxCode: 'E11.9', // Primary diagnosis
          dxText: 'Type 2 diabetes mellitus without complications',
          isPrimary: true,
        },
      }),
      prisma.referralDiagnosis.create({
        data: {
          referralId: referrals[1].id,
          dxCode: 'I10',
          dxText: 'Essential (primary) hypertension',
          isPrimary: false,
        },
      }),
      prisma.referralDiagnosis.create({
        data: {
          referralId: referrals[1].id,
          dxCode: 'E66.9',
          dxText: 'Obesity, unspecified',
          isPrimary: false,
        },
      }),

      // Referral 3: Pressure Ulcer (Primary) + Multiple comorbidities
      prisma.referralDiagnosis.create({
        data: {
          referralId: referrals[2].id,
          dxCode: 'L89.9', // Primary diagnosis
          dxText: 'Pressure ulcer of unspecified site, unspecified stage',
          isPrimary: true,
        },
      }),
      prisma.referralDiagnosis.create({
        data: {
          referralId: referrals[2].id,
          dxCode: 'I10',
          dxText: 'Essential (primary) hypertension',
          isPrimary: false,
        },
      }),
      prisma.referralDiagnosis.create({
        data: {
          referralId: referrals[2].id,
          dxCode: 'E11.9',
          dxText: 'Type 2 diabetes mellitus without complications',
          isPrimary: false,
        },
      }),
    ])

    // Create referral medications
    await Promise.all([
      prisma.referralMedication.create({
        data: {
          referralId: referrals[0].id,
          medicationId: medications[1].id, // Lisinopril
          isHighCost: false,
        },
      }),
      prisma.referralMedication.create({
        data: {
          referralId: referrals[1].id,
          medicationId: medications[0].id, // Metformin
          isHighCost: false,
        },
      }),
      prisma.referralMedication.create({
        data: {
          referralId: referrals[1].id,
          medicationId: medications[2].id, // Atorvastatin
          isHighCost: true,
        },
      }),
    ])

    // Create referral disciplines
    await Promise.all([
      prisma.referralDiscipline.create({
        data: {
          referralId: referrals[0].id,
          disciplineId: disciplines[0].id, // SN
        },
      }),
      prisma.referralDiscipline.create({
        data: {
          referralId: referrals[0].id,
          disciplineId: disciplines[1].id, // PT
        },
      }),
      prisma.referralDiscipline.create({
        data: {
          referralId: referrals[1].id,
          disciplineId: disciplines[0].id, // SN
        },
      }),
      prisma.referralDiscipline.create({
        data: {
          referralId: referrals[2].id,
          disciplineId: disciplines[0].id, // SN
        },
      }),
      prisma.referralDiscipline.create({
        data: {
          referralId: referrals[2].id,
          disciplineId: disciplines[2].id, // OT
        },
      }),
    ])

    console.log('✅ Database seeded successfully!')
    console.log(`📊 Created ${patients.length} patients`)
    console.log(`🏥 Created ${referrals.length} referrals`)
    console.log(`💊 Created ${services.length} services`)
    console.log(`🏢 Created ${payers.length} payers`)
    console.log(`👥 Created ${disciplines.length} disciplines`)
    console.log(`🧪 Created ${diagnoses.length} diagnoses`)

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })