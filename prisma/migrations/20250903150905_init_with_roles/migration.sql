CREATE TYPE "public"."UserRole" AS ENUM ('SUPERADMIN', 'ADMIN', 'MEMBER');

CREATE TYPE "public"."OrganizationRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER', 'VIEWER');

CREATE TYPE "public"."InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'EXPIRED', 'REVOKED');

ALTER TABLE "public"."User" ADD COLUMN     "role" "public"."UserRole" NOT NULL DEFAULT 'MEMBER',
ADD COLUMN     "settings" JSONB;

ALTER TABLE "public"."UserOrganization" DROP COLUMN "role",
ADD COLUMN     "role" "public"."OrganizationRole" NOT NULL DEFAULT 'MEMBER';

CREATE TABLE "public"."OrganizationInvitation" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "public"."OrganizationRole" NOT NULL DEFAULT 'MEMBER',
    "status" "public"."InvitationStatus" NOT NULL DEFAULT 'PENDING',
    "invitedBy" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT (NOW() + INTERVAL '7 days'),
    "acceptedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "OrganizationInvitation_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "OrganizationInvitation_organizationId_idx" ON "public"."OrganizationInvitation"("organizationId");

CREATE INDEX "OrganizationInvitation_email_idx" ON "public"."OrganizationInvitation"("email");

CREATE INDEX "OrganizationInvitation_status_idx" ON "public"."OrganizationInvitation"("status");

CREATE UNIQUE INDEX "OrganizationInvitation_organizationId_email_key" ON "public"."OrganizationInvitation"("organizationId", "email");

ALTER TABLE "public"."OrganizationInvitation" ADD CONSTRAINT "OrganizationInvitation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "public"."Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "public"."OrganizationInvitation" ADD CONSTRAINT "OrganizationInvitation_invitedBy_fkey" FOREIGN KEY ("invitedBy") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
