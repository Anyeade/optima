const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('🧪 Testing Optima API database connection...')

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

async function testDatabase() {
  console.log('\n📋 Testing database tables...\n')
  
  try {
    // Test profiles table
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)
    
    if (profilesError) {
      console.log('⚠️  Profiles table:', profilesError.message)
    } else {
      console.log('✅ Profiles table: Accessible')
    }

    // Test processes table
    const { data: processes, error: processesError } = await supabase
      .from('processes')
      .select('count')
      .limit(1)
    
    if (processesError) {
      console.log('⚠️  Processes table:', processesError.message)
    } else {
      console.log('✅ Processes table: Accessible')
    }

    // Test api_usage table
    const { data: apiUsage, error: apiUsageError } = await supabase
      .from('api_usage')
      .select('count')
      .limit(1)
    
    if (apiUsageError) {
      console.log('⚠️  API Usage table:', apiUsageError.message)
    } else {
      console.log('✅ API Usage table: Accessible')
    }

    console.log('\n🎉 Database test completed!')
    console.log('\n📋 Next Steps:')
    console.log('1. Sign up for a new account on your platform')
    console.log('2. Check if profile is created automatically')
    console.log('3. Verify sample data appears in dashboard')
    console.log('4. Test API playground functionality')
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message)
  }
}

testDatabase()