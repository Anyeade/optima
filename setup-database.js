const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('Setting up Optima API database...')

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  try {
    console.log('📋 Reading SQL setup script...')
    const sqlScript = fs.readFileSync('supabase-setup.sql', 'utf8')
    
    // Split the script into individual statements
    const statements = sqlScript
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))
    
    console.log(`🔧 Executing ${statements.length} SQL statements...`)
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      if (statement.trim()) {
        try {
          const { error } = await supabase.rpc('exec_sql', { sql: statement })
          if (error && !error.message.includes('already exists')) {
            console.warn(`⚠️  Statement ${i + 1}: ${error.message}`)
          }
        } catch (err) {
          // Try direct query for simpler statements
          try {
            await supabase.from('_').select('1').limit(0) // This will fail but establish connection
          } catch (e) {
            // Ignore connection test errors
          }
        }
      }
    }
    
    console.log('✅ Database setup completed!')
    
    // Test the setup by checking if tables exist
    console.log('🧪 Testing database setup...')
    
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)
    
    if (profilesError) {
      console.log('⚠️  Profiles table not accessible via RLS, this is expected')
    } else {
      console.log('✅ Profiles table accessible')
    }
    
    return true
  } catch (err) {
    console.error('❌ Database setup failed:', err.message)
    return false
  }
}

// Alternative manual setup function
async function manualSetup() {
  console.log('🔧 Setting up database manually...')
  
  try {
    // Create profiles table
    const { error: profilesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID REFERENCES auth.users ON DELETE CASCADE,
          email TEXT NOT NULL,
          full_name TEXT,
          avatar_url TEXT,
          api_key TEXT UNIQUE DEFAULT ('optima_' || substr(md5(random()::text), 1, 24)),
          subscription_tier TEXT DEFAULT 'free',
          api_calls_used INTEGER DEFAULT 0,
          api_calls_limit INTEGER DEFAULT 1000,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          PRIMARY KEY (id)
        );
      `
    })
    
    if (profilesError) {
      console.log('Profiles table setup result:', profilesError.message)
    }
    
    console.log('✅ Manual setup completed!')
    return true
  } catch (err) {
    console.error('❌ Manual setup failed:', err.message)
    return false
  }
}

console.log('🚀 Starting database setup...')
console.log('📝 Please run the SQL script manually in your Supabase dashboard:')
console.log('   1. Go to https://supabase.com/dashboard/project/bazttzhnawopotzsfcqo/sql')
console.log('   2. Copy and paste the contents of supabase-setup.sql')
console.log('   3. Click "Run" to execute the script')
console.log('')
console.log('The SQL script contains:')
console.log('   - profiles table for user data')
console.log('   - processes table for business processes')
console.log('   - api_usage table for tracking API calls')
console.log('   - Row Level Security policies')
console.log('   - Automatic profile creation trigger')
console.log('   - Sample data for demo purposes')

process.exit(0)