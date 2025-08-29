import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { users, } from '../app/lib/placeholder-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Seed Users
  console.log('Seeding users...');
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.upsert({
      where: {id: user.id},
      update: {},
      create: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });
  }

  main()
      .then(async () => {
        await prisma.$disconnect();
      })
      .catch(async (e) => {
        console.error('Error during seeding:', e);
        await prisma.$disconnect();
        process.exit(1);
      });
}