CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."UserOrganization" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'member',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserOrganization_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'healthcare',
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "phone" TEXT,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."Patient" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dob" TIMESTAMP(3),
    "sex" TEXT,
    "height" TEXT,
    "weight" TEXT,
    "age" INTEGER,
    "phone" TEXT,
    "email" TEXT,
    "emergencyContact" TEXT,
    "emergencyPhone" TEXT,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postalCode" TEXT,
    "country" TEXT DEFAULT 'USA',
    "primaryInsurance" TEXT,
    "insuranceId" TEXT,
    "medicalRecordNumber" TEXT,
    "status" TEXT DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."EmergencyContact" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "relation" TEXT,
    CONSTRAINT "EmergencyContact_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."Referral" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "livesWith" TEXT,
    "ecName" TEXT,
    "ecPhone" TEXT,
    "ecRelation" TEXT,
    "ntaScore" TEXT,
    "hmoPlanType" TEXT,
    "medicareHmoProvider" TEXT,
    "primaryDxCode" TEXT,
    "primaryDxText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."ReferralService" (
    "id" TEXT NOT NULL,
    "referralId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    CONSTRAINT "ReferralService_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."Diagnosis" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "display" TEXT NOT NULL,
    "category" TEXT,
    CONSTRAINT "Diagnosis_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."ReferralDiagnosis" (
    "id" TEXT NOT NULL,
    "referralId" TEXT NOT NULL,
    "diagnosisId" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    CONSTRAINT "ReferralDiagnosis_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."Medication" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "genericName" TEXT,
    "category" TEXT,
    CONSTRAINT "Medication_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."ReferralMedication" (
    "id" TEXT NOT NULL,
    "referralId" TEXT NOT NULL,
    "medicationId" TEXT NOT NULL,
    "dosage" TEXT,
    "frequency" TEXT,
    "duration" TEXT,
    "notes" TEXT,
    CONSTRAINT "ReferralMedication_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."Discipline" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    CONSTRAINT "Discipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ReferralDiscipline" (
    "id" TEXT NOT NULL,
    "referralId" TEXT NOT NULL,
    "disciplineId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    CONSTRAINT "ReferralDiscipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    CONSTRAINT "Payer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ReferralCoverage" (
    "id" TEXT NOT NULL,
    "referralId" TEXT NOT NULL,
    "payerId" TEXT NOT NULL,
    "policyNumber" TEXT,
    "groupNumber" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    CONSTRAINT "ReferralCoverage_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

CREATE UNIQUE INDEX "User_phone_key" ON "public"."User"("phone");

CREATE UNIQUE INDEX "Session_tokenHash_key" ON "public"."Session"("tokenHash");

CREATE INDEX "UserOrganization_userId_idx" ON "public"."UserOrganization"("userId");

CREATE INDEX "UserOrganization_organizationId_idx" ON "public"."UserOrganization"("organizationId");

CREATE UNIQUE INDEX "UserOrganization_userId_organizationId_key" ON "public"."UserOrganization"("userId", "organizationId");

CREATE UNIQUE INDEX "Organization_name_key" ON "public"."Organization"("name");

CREATE UNIQUE INDEX "Patient_medicalRecordNumber_key" ON "public"."Patient"("medicalRecordNumber");

CREATE INDEX "Patient_organizationId_idx" ON "public"."Patient"("organizationId");

CREATE INDEX "Patient_lastName_firstName_idx" ON "public"."Patient"("lastName", "firstName");

CREATE INDEX "Patient_status_idx" ON "public"."Patient"("status");

CREATE INDEX "EmergencyContact_patientId_idx" ON "public"."EmergencyContact"("patientId");

CREATE INDEX "ReferralService_referralId_idx" ON "public"."ReferralService"("referralId");

CREATE INDEX "ReferralService_serviceId_idx" ON "public"."ReferralService"("serviceId");

CREATE UNIQUE INDEX "Diagnosis_code_key" ON "public"."Diagnosis"("code");

CREATE INDEX "ReferralDiagnosis_referralId_idx" ON "public"."ReferralDiagnosis"("referralId");

CREATE INDEX "ReferralDiagnosis_diagnosisId_idx" ON "public"."ReferralDiagnosis"("diagnosisId");

CREATE INDEX "ReferralMedication_referralId_idx" ON "public"."ReferralMedication"("referralId");

CREATE INDEX "ReferralMedication_medicationId_idx" ON "public"."ReferralMedication"("medicationId");

CREATE UNIQUE INDEX "Discipline_name_key" ON "public"."Discipline"("name");

CREATE INDEX "ReferralDiscipline_referralId_idx" ON "public"."ReferralDiscipline"("referralId");

CREATE INDEX "ReferralDiscipline_disciplineId_idx" ON "public"."ReferralDiscipline"("disciplineId");

CREATE UNIQUE INDEX "Payer_name_key" ON "public"."Payer"("name");

CREATE INDEX "ReferralCoverage_referralId_idx" ON "public"."ReferralCoverage"("referralId");

CREATE INDEX "ReferralCoverage_payerId_idx" ON "public"."ReferralCoverage"("payerId");

ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "public"."UserOrganization" ADD CONSTRAINT "UserOrganization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "public"."UserOrganization" ADD CONSTRAINT "UserOrganization_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "public"."Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "public"."Patient" ADD CONSTRAINT "Patient_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "public"."Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "public"."EmergencyContact" ADD CONSTRAINT "EmergencyContact_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "public"."Referral" ADD CONSTRAINT "Referral_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "public"."ReferralService" ADD CONSTRAINT "ReferralService_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "public"."Referral"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "public"."ReferralService" ADD CONSTRAINT "ReferralService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "public"."Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "public"."ReferralDiagnosis" ADD CONSTRAINT "ReferralDiagnosis_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "public"."Referral"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "public"."ReferralDiagnosis" ADD CONSTRAINT "ReferralDiagnosis_diagnosisId_fkey" FOREIGN KEY ("diagnosisId") REFERENCES "public"."Diagnosis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "public"."ReferralMedication" ADD CONSTRAINT "ReferralMedication_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "public"."Referral"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "public"."ReferralMedication" ADD CONSTRAINT "ReferralMedication_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "public"."Medication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "public"."ReferralDiscipline" ADD CONSTRAINT "ReferralDiscipline_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "public"."Referral"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "public"."ReferralDiscipline" ADD CONSTRAINT "ReferralDiscipline_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "public"."Discipline"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "public"."ReferralCoverage" ADD CONSTRAINT "ReferralCoverage_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "public"."Referral"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "public"."ReferralCoverage" ADD CONSTRAINT "ReferralCoverage_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "public"."Payer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
