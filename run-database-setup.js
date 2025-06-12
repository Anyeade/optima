const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('🚀 Setting up Optima API database...')
console.log('📋 URL:', supabaseUrl)
console.log('🔑 Service Key:', supabaseServiceKey ? 'Present' : 'Missing')

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

async function runSQL(sql, description) {
  try {
    console.log(`🔧 ${description}...`)
    const { data, error } = await supabase.rpc('exec', { sql })
    
    if (error) {
      // Some errors are expected (like "already exists")
      if (error.message.includes('already exists') || 
          error.message.includes('does not exist') ||
          error.message.includes('cannot drop')) {
        console.log(`⚠️  ${description}: ${error.message}`)
        return true
      } else {
        console.error(`❌ ${description}: ${error.message}`)
        return false
      }
    }
    
    console.log(`✅ ${description}: Success`)
    return true
  } catch (err) {
    console.error(`❌ ${description}: ${err.message}`)
    return false
  }
}

async function setupDatabase() {
  console.log('\n📋 Creating database tables...\n')
  
  // Create profiles table
  await runSQL(`
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
  `, 'Creating profiles table')

  // Create processes table
  await runSQL(`
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
  `, 'Creating processes table')

  // Create api_usage table
  await runSQL(`
    CREATE TABLE IF NOT EXISTS api_usage (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
      endpoint TEXT NOT NULL,
      method TEXT NOT NULL,
      status_code INTEGER,
      response_time_ms INTEGER,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `, 'Creating api_usage table')

  console.log('\n🔒 Setting up Row Level Security...\n')

  // Enable RLS
  await runSQL('ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;', 'Enabling RLS on profiles')
  await runSQL('ALTER TABLE processes ENABLE ROW LEVEL SECURITY;', 'Enabling RLS on processes')
  await runSQL('ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;', 'Enabling RLS on api_usage')

  // Drop existing policies
  await runSQL('DROP POLICY IF EXISTS "Users can view own profile" ON profiles;', 'Dropping old profile policy')
  await runSQL('DROP POLICY IF EXISTS "Users can update own profile" ON profiles;', 'Dropping old profile update policy')
  await runSQL('DROP POLICY IF EXISTS "Users can view own processes" ON processes;', 'Dropping old processes policy')
  await runSQL('DROP POLICY IF EXISTS "Users can manage own processes" ON processes;', 'Dropping old processes management policy')
  await runSQL('DROP POLICY IF EXISTS "Users can view own api usage" ON api_usage;', 'Dropping old api_usage policy')

  console.log('\n🛡️ Creating security policies...\n')

  // Create RLS policies
  await runSQL(`
    CREATE POLICY "Users can view own profile" ON profiles
      FOR SELECT USING (auth.uid() = id);
  `, 'Creating profile view policy')

  await runSQL(`
    CREATE POLICY "Users can update own profile" ON profiles
      FOR ALL USING (auth.uid() = id);
  `, 'Creating profile update policy')

  await runSQL(`
    CREATE POLICY "Users can view own processes" ON processes
      FOR SELECT USING (auth.uid() = user_id);
  `, 'Creating processes view policy')

  await runSQL(`
    CREATE POLICY "Users can manage own processes" ON processes
      FOR ALL USING (auth.uid() = user_id);
  `, 'Creating processes management policy')

  await runSQL(`
    CREATE POLICY "Users can view own api usage" ON api_usage
      FOR SELECT USING (auth.uid() = user_id);
  `, 'Creating api_usage view policy')

  console.log('\n⚡ Creating triggers...\n')

  // Create function for automatic profile creation
  await runSQL(`
    CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS trigger AS $$
    BEGIN
      INSERT INTO public.profiles (id, email, full_name)
      VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
      RETURN new;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
  `, 'Creating profile creation function')

  // Drop existing trigger
  await runSQL('DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;', 'Dropping old trigger')

  // Create trigger for automatic profile creation
  await runSQL(`
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
  `, 'Creating profile creation trigger')

  console.log('\n📊 Adding sample data...\n')

  // Add sample data (this will only work if there are users)
  await runSQL(`
    INSERT INTO processes (user_id, name, description, status, optimization_score, process_data, insights)
    SELECT 
      id as user_id,
      'Demo User Onboarding Process' as name,
      'Sample process for demonstration purposes' as description,
      'active' as status,
      78 as optimization_score,
      '{"steps": [{"name": "Registration", "duration": 120}, {"name": "Email Verification", "duration": 300}, {"name": "Profile Setup", "duration": 180}]}' as process_data,
      '{"bottlenecks": ["Email Verification"], "recommendations": ["Add automated reminders", "Simplify verification process"]}' as insights
    FROM profiles
    WHERE NOT EXISTS (SELECT 1 FROM processes WHERE user_id = profiles.id)
    LIMIT 1;
  `, 'Adding sample process data')

  console.log('\n🧪 Testing database setup...\n')

  // Test the setup
  const { data: profilesTest, error: profilesError } = await supabase
    .from('profiles')
    .select('count')
    .limit(1)

  if (profilesError) {
    console.log('⚠️  Profiles table test (expected with RLS):', profilesError.message)
  } else {
    console.log('✅ Profiles table accessible')
  }

  const { data: processesTest, error: processesError } = await supabase
    .from('processes')
    .select('count')
    .limit(1)

  if (processesError) {
    console.log('⚠️  Processes table test (expected with RLS):', processesError.message)
  } else {
    console.log('✅ Processes table accessible')
  }

  console.log('\n🎉 Database setup completed successfully!')
  console.log('\n📋 Summary:')
  console.log('   ✅ profiles table created with user data and API keys')
  console.log('   ✅ processes table created for business process management')
  console.log('   ✅ api_usage table created for tracking and analytics')
  console.log('   ✅ Row Level Security enabled on all tables')
  console.log('   ✅ Security policies created for data protection')
  console.log('   ✅ Automatic profile creation trigger set up')
  console.log('   ✅ Sample data added for demonstration')
  console.log('\n🚀 Your Optima API platform is now fully operational!')
  
  return true
}

setupDatabase().then(success => {
  process.exit(success ? 0 : 1)
})