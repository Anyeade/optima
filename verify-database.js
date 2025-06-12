#!/usr/bin/env node

/**
 * Database Verification Script
 * Tests the Supabase database setup and connection
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('🔍 Verifying Optima API database setup...\n')

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function verifyDatabase() {
  console.log('📊 Database Configuration:')
  console.log(`   URL: ${supabaseUrl}`)
  console.log(`   Service Key: ${supabaseServiceKey.substring(0, 20)}...`)
  console.log('')

  const tests = [
    {
      name: 'Profiles Table',
      test: async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('count')
          .limit(1)
        return { success: !error, error: error?.message }
      }
    },
    {
      name: 'Processes Table',
      test: async () => {
        const { data, error } = await supabase
          .from('processes')
          .select('id, name, status')
          .limit(5)
        return { 
          success: !error, 
          error: error?.message,
          data: data?.length ? `Found ${data.length} sample processes` : 'No data'
        }
      }
    },
    {
      name: 'API Usage Logs Table',
      test: async () => {
        const { data, error } = await supabase
          .from('api_usage_logs')
          .select('count')
          .limit(1)
        return { success: !error, error: error?.message }
      }
    },
    {
      name: 'Automation Jobs Table',
      test: async () => {
        const { data, error } = await supabase
          .from('automation_jobs')
          .select('count')
          .limit(1)
        return { success: !error, error: error?.message }
      }
    },
    {
      name: 'API Key Generation Function',
      test: async () => {
        const { data, error } = await supabase
          .rpc('generate_api_key')
        return { 
          success: !error && data?.startsWith('optima_'), 
          error: error?.message,
          data: data ? `Generated: ${data.substring(0, 20)}...` : 'No key generated'
        }
      }
    }
  ]

  console.log('🧪 Running database tests...\n')

  let passedTests = 0
  let totalTests = tests.length

  for (const test of tests) {
    try {
      const result = await test.test()
      
      if (result.success) {
        console.log(`✅ ${test.name}: PASSED`)
        if (result.data) {
          console.log(`   ${result.data}`)
        }
        passedTests++
      } else {
        console.log(`❌ ${test.name}: FAILED`)
        if (result.error) {
          console.log(`   Error: ${result.error}`)
        }
      }
    } catch (err) {
      console.log(`❌ ${test.name}: ERROR`)
      console.log(`   ${err.message}`)
    }
    console.log('')
  }

  console.log('📊 Test Results:')
  console.log(`   Passed: ${passedTests}/${totalTests}`)
  console.log(`   Success Rate: ${Math.round((passedTests/totalTests) * 100)}%`)
  
  if (passedTests === totalTests) {
    console.log('\n🎉 Database verification successful!')
    console.log('✅ Your Optima API database is fully operational')
    console.log('\n🚀 Next steps:')
    console.log('   1. Start the application: npm run dev')
    console.log('   2. Test user registration and API calls')
    console.log('   3. Deploy to production when ready')
  } else {
    console.log('\n⚠️  Database setup incomplete')
    console.log('📋 Please ensure you have:')
    console.log('   1. Executed the SQL from EXECUTE_IN_SUPABASE.sql')
    console.log('   2. Enabled email authentication in Supabase')
    console.log('   3. Set the correct site URL in Supabase settings')
  }

  return passedTests === totalTests
}

// Run verification
verifyDatabase().catch(error => {
  console.error('❌ Verification failed:', error.message)
  process.exit(1)
})