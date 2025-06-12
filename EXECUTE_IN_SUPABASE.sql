-- =====================================================
-- OPTIMA API - COMPLETE DATABASE SETUP
-- =====================================================
-- Execute this SQL in your Supabase Dashboard → SQL Editor
-- Project: https://supabase.com/dashboard/project/bazttzhnawopotzsfcqo/sql
-- =====================================================

-- Step 1: Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Step 2: Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  api_key TEXT UNIQUE,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'professional', 'enterprise', 'enterprise_plus')),
  api_calls_used INTEGER DEFAULT 0,
  api_calls_limit INTEGER DEFAULT 1000,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Step 3: Create processes table
CREATE TABLE IF NOT EXISTS processes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'optimizing')),
  optimization_score INTEGER DEFAULT 0,
  process_data JSONB,
  insights JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 4: Create API usage logs table
CREATE TABLE IF NOT EXISTS api_usage_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  status_code INTEGER,
  response_time_ms INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 5: Create automation jobs table
CREATE TABLE IF NOT EXISTS automation_jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  process_id UUID REFERENCES processes(id) ON DELETE CASCADE,
  job_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  progress INTEGER DEFAULT 0,
  result JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 6: Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE processes ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_jobs ENABLE ROW LEVEL SECURITY;

-- Step 7: Create security policies for profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Step 8: Create security policies for processes
CREATE POLICY "Users can view own processes" ON processes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create processes" ON processes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own processes" ON processes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own processes" ON processes FOR DELETE USING (auth.uid() = user_id);

-- Step 9: Create security policies for API logs
CREATE POLICY "Users can view own api logs" ON api_usage_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service can insert api logs" ON api_usage_logs FOR INSERT WITH CHECK (true);

-- Step 10: Create security policies for automation jobs
CREATE POLICY "Users can view own automation jobs" ON automation_jobs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create automation jobs" ON automation_jobs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own automation jobs" ON automation_jobs FOR UPDATE USING (auth.uid() = user_id);

-- Step 11: Create API key generation function
CREATE OR REPLACE FUNCTION generate_api_key()
RETURNS TEXT AS $$
BEGIN
  RETURN 'optima_' || encode(gen_random_bytes(32), 'hex');
END;
$$ LANGUAGE plpgsql;

-- Step 12: Create user registration handler
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, api_key)
  VALUES (
    NEW.id,
    NEW.email,
    generate_api_key()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 13: Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Step 14: Create updated_at function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 15: Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_processes_updated_at BEFORE UPDATE ON processes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_automation_jobs_updated_at BEFORE UPDATE ON automation_jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Step 16: Create performance indexes
CREATE INDEX IF NOT EXISTS idx_profiles_api_key ON profiles(api_key);
CREATE INDEX IF NOT EXISTS idx_processes_user_id ON processes(user_id);
CREATE INDEX IF NOT EXISTS idx_processes_status ON processes(status);
CREATE INDEX IF NOT EXISTS idx_api_usage_logs_user_id ON api_usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_api_usage_logs_created_at ON api_usage_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_automation_jobs_user_id ON automation_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_automation_jobs_process_id ON automation_jobs(process_id);
CREATE INDEX IF NOT EXISTS idx_automation_jobs_status ON automation_jobs(status);

-- Step 17: Insert sample data for testing
INSERT INTO processes (id, user_id, name, description, status, optimization_score, process_data, insights) VALUES
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000', -- Placeholder user ID
  'Customer Onboarding',
  'Complete customer registration and verification process',
  'active',
  78,
  '{
    "steps": [
      {"name": "Account Creation", "duration": 300, "success_rate": 0.95, "cost": 2.50},
      {"name": "Email Verification", "duration": 1800, "success_rate": 0.87, "cost": 1.00},
      {"name": "Profile Setup", "duration": 600, "success_rate": 0.92, "cost": 3.00}
    ],
    "total_duration": 2700,
    "overall_success_rate": 0.91,
    "total_cost": 6.50
  }',
  '{
    "bottlenecks": [
      {"step": "Email Verification", "issue": "High abandonment rate", "impact": "medium"}
    ],
    "recommendations": [
      {"type": "automation", "description": "Add automated email reminders", "impact": "15% improvement"},
      {"type": "workflow", "description": "Combine profile setup with account creation", "impact": "25% time reduction"}
    ]
  }'
),
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'E-commerce Checkout',
  'Online shopping cart to order completion',
  'active',
  65,
  '{
    "steps": [
      {"name": "Add to Cart", "duration": 120, "success_rate": 0.98, "cost": 0.50},
      {"name": "Checkout Form", "duration": 240, "success_rate": 0.75, "cost": 1.20},
      {"name": "Payment Processing", "duration": 180, "success_rate": 0.92, "cost": 2.00},
      {"name": "Order Confirmation", "duration": 60, "success_rate": 0.99, "cost": 0.30}
    ],
    "total_duration": 600,
    "overall_success_rate": 0.65,
    "total_cost": 4.00
  }',
  '{
    "bottlenecks": [
      {"step": "Checkout Form", "issue": "Form abandonment", "impact": "high"},
      {"step": "Payment Processing", "issue": "Payment failures", "impact": "medium"}
    ],
    "recommendations": [
      {"type": "ux", "description": "Simplify checkout form", "impact": "20% improvement"},
      {"type": "integration", "description": "Add multiple payment options", "impact": "10% improvement"}
    ]
  }'
),
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'Support Ticket Resolution',
  'Customer support ticket lifecycle',
  'optimizing',
  82,
  '{
    "steps": [
      {"name": "Ticket Creation", "duration": 60, "success_rate": 1.0, "cost": 0.25},
      {"name": "Initial Response", "duration": 1440, "success_rate": 0.95, "cost": 5.00},
      {"name": "Investigation", "duration": 2880, "success_rate": 0.88, "cost": 15.00},
      {"name": "Resolution", "duration": 720, "success_rate": 0.92, "cost": 8.00}
    ],
    "total_duration": 5100,
    "overall_success_rate": 0.76,
    "total_cost": 28.25
  }',
  '{
    "bottlenecks": [
      {"step": "Investigation", "issue": "Long research time", "impact": "high"},
      {"step": "Initial Response", "issue": "Delayed first contact", "impact": "medium"}
    ],
    "recommendations": [
      {"type": "automation", "description": "Auto-categorize tickets", "impact": "30% faster resolution"},
      {"type": "knowledge", "description": "Improve knowledge base", "impact": "25% faster investigation"}
    ]
  }'
);

-- =====================================================
-- SETUP COMPLETE! 
-- =====================================================
-- Your Optima API database is now fully configured with:
-- ✅ All tables created with proper relationships
-- ✅ Row Level Security enabled for data protection  
-- ✅ Automatic API key generation for new users
-- ✅ Triggers for user registration and timestamps
-- ✅ Performance indexes for optimal queries
-- ✅ Sample data for testing and development
-- =====================================================