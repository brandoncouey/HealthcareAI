#!/usr/bin/env node

/**
 * Heroku Database Seeding Script
 * 
 * This script ensures the database is properly seeded on Heroku.
 * Run this if the automatic seeding fails.
 */

const { execSync } = require('child_process');

console.log('🌱 Starting Heroku database seeding...');

try {
  // Generate Prisma client
  console.log('📦 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  // Run migrations
  console.log('🔄 Running database migrations...');
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });

  // Seed the database
  console.log('🌱 Seeding database...');
  execSync('npx prisma db seed', { stdio: 'inherit' });

  console.log('✅ Database seeding completed successfully!');
} catch (error) {
  console.error('❌ Database seeding failed:', error.message);
  process.exit(1);
}
