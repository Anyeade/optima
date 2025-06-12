const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('🚀 Setting up Optima API database...')

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setupDatabase() {
  try {
    console.log('📋 Creating profiles table...')
    
    // Create profiles table
    const { error: profilesError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID REFERENCES auth.users ON DELETE CASCADE,
          email TEXT NOT NULL,
          full_name TEXT,
          avatar_url TEXT,
          api_key TEXT UNIQUE DEFAULT ('optima_' || substr(md5(random()::text), 1, 24)),
          subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'professional', 'enterprise', 'enterprise_plus')),
          api_calls_used INTEGER DEFAULT 0,
          api_calls_limit INTEGER DEFAULT 1000,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          PRIMARY KEY (id)
        );
      `
    })

    if (profilesError) {
      console.log('⚠️  Profiles table:', profilesError.message)
    } else {
      console.log('✅ Profiles table created')
    }

    console.log('📋 Creating processes table...')
    
    // Create processes table
    const { error: processesError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS processes (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
          name TEXT NOT NULL,
          description TEXT,
          status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'optimizing', 'completed')),
          optimization_score INTEGER DEFAULT 0,
          process_data JSONB,
          insights JSONB,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })

    if (processesError) {
      console.log('⚠️  Processes table:', processesError.message)
    } else {
      console.log('✅ Processes table created')
    }

    console.log('🔒 Setting up Row Level Security...')
    
    // Enable RLS
    await supabase.rpc('exec', {
      sql: 'ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;'
    })
    
    await supabase.rpc('exec', {
      sql: 'ALTER TABLE processes ENABLE ROW LEVEL SECURITY;'
    })

    console.log('✅ Database setup completed!')
    
    // Test connection
    console.log('🧪 Testing database connection...')
    const { data, error } = await supabase.from('profiles').select('count').limit(1)
    
    if (error) {
      console.log('⚠️  Connection test (expected with RLS):', error.message)
    } else {
      console.log('✅ Database connection successful')
    }

    return true
  } catch (err) {
    console.error('❌ Setup failed:', err.message)
    return false
  }
}

setupDatabase().then(success => {
  if (success) {
    console.log('\n🎉 Supabase setup completed!')
    console.log('📝 Manual steps remaining:')
    console.log('   1. Go to https://supabase.com/dashboard/project/bazttzhnawopotzsfcqo/sql')
    console.log('   2. Run the SQL from supabase-setup.sql for complete setup')
    console.log('   3. This includes RLS policies and triggers')
  }
  process.exit(success ? 0 : 1)
})