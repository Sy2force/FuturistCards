#!/usr/bin/env node

import dotenv from 'dotenv';
import { seedDatabase, resetDatabase, getSeedStats } from '../seed/seedData.js';
import connectDB from '../config/db.js';

// Load environment variables
dotenv.config();

/**
 * CLI Script pour seeder la base de données CardPro
 * Usage: npm run seed [reset|stats]
 */

const command = process.argv[2];

async function main() {
  try {
    console.log('🚀 CardPro Database Seeder');
    console.log('================================\n');

    // Connect to database
    await connectDB();
    console.log('📡 Connected to MongoDB\n');

    switch (command) {
      case 'reset':
        console.log('⚠️  RESET MODE - This will delete all data!');
        const resetResult = await resetDatabase();
        if (resetResult.success) {
          console.log('✅ Database reset completed');
        } else {
          console.error('❌ Reset failed:', resetResult.error);
          process.exit(1);
        }
        break;

      case 'stats':
        const stats = await getSeedStats();
        if (stats.success) {
          console.log('📊 Database Statistics:');
          console.log(`   • Users: ${stats.users}`);
          console.log(`   • Cards: ${stats.cards}`);
          console.log(`   • Seeded: ${stats.seeded ? '✅ Yes' : '❌ No'}`);
        } else {
          console.error('❌ Stats failed:', stats.error);
          process.exit(1);
        }
        break;

      default:
        // Default seed operation
        const seedResult = await seedDatabase();
        if (seedResult.success) {
          console.log('\n🎉 Seeding completed successfully!');
        } else {
          console.error('\n❌ Seeding failed:', seedResult.error);
          process.exit(1);
        }
        break;
    }

    console.log('\n✅ Operation completed');
    process.exit(0);

  } catch (error) {
    console.error('\n💥 Fatal error:', error.message);
    process.exit(1);
  }
}

// Execute main function
main();
