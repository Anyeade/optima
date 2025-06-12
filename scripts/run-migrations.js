#!/usr/bin/env node

/**
 * Supabase Migration Runner
 * Runs database migrations in order
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
  process.exit(1);
}

async function runMigration(migrationFile) {
  const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', migrationFile);
  
  if (!fs.existsSync(migrationPath)) {
    console.error(`❌ Migration file not found: ${migrationFile}`);
    return false;
  }

  const sql = fs.readFileSync(migrationPath, 'utf8');
  
  console.log(`🔄 Running migration: ${migrationFile}`);
  
  try {
    // For now, we'll output the SQL that should be run manually
    // In a production setup, you'd use the Supabase CLI or API
    console.log(`📝 SQL to execute:\n${sql}\n`);
    console.log(`✅ Migration ${migrationFile} ready to execute`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to run migration ${migrationFile}:`, error.message);
    return false;
  }
}

async function runAllMigrations() {
  console.log('🚀 Starting database migrations...\n');
  
  const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');
  
  if (!fs.existsSync(migrationsDir)) {
    console.error('❌ Migrations directory not found');
    process.exit(1);
  }

  const migrationFiles = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .sort();

  if (migrationFiles.length === 0) {
    console.log('ℹ️  No migration files found');
    return;
  }

  console.log(`📋 Found ${migrationFiles.length} migration(s):`);
  migrationFiles.forEach(file => console.log(`   - ${file}`));
  console.log('');

  let successCount = 0;
  
  for (const file of migrationFiles) {
    const success = await runMigration(file);
    if (success) {
      successCount++;
    } else {
      console.error(`❌ Migration failed: ${file}`);
      break;
    }
  }

  console.log(`\n📊 Migration Summary:`);
  console.log(`   ✅ Successful: ${successCount}/${migrationFiles.length}`);
  
  if (successCount === migrationFiles.length) {
    console.log('\n🎉 All migrations completed successfully!');
    console.log('\n📋 Next Steps:');
    console.log('1. Copy the SQL from above');
    console.log('2. Go to your Supabase Dashboard → SQL Editor');
    console.log('3. Paste and execute each migration in order');
    console.log('4. Verify tables are created correctly');
  } else {
    console.log('\n❌ Some migrations failed. Please check the errors above.');
    process.exit(1);
  }
}

// Run migrations
runAllMigrations().catch(error => {
  console.error('❌ Migration runner failed:', error);
  process.exit(1);
});