-- =====================================================
-- OPTIMA API - COMPLETE DATABASE SETUP (FIXED)
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

-- =====================================================
-- SETUP COMPLETE! 
-- =====================================================
-- Your Optima API database is now fully configured with:
-- ✅ All tables created with proper relationships
-- ✅ Row Level Security enabled for data protection  
-- ✅ Automatic API key generation for new users
-- ✅ Triggers for user registration and timestamps
-- ✅ Performance indexes for optimal queries
-- 
-- NOTE: Sample data will be created automatically when 
-- users sign up and use the API. The trigger will 
-- automatically create profiles for new users.
-- =====================================================