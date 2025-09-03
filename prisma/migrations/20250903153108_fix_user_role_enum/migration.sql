ALTER TABLE "public"."OrganizationInvitation" ALTER COLUMN "expiresAt" SET DEFAULT (NOW() + INTERVAL '7 days');
