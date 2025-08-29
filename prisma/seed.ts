import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  // Add your seed data here
  console.log('Seeding database...')
  
  // Example: Create a test user
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: 'hashedpassword', // In real app, hash this
    },
  })
  
  console.log('Seed completed')
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })