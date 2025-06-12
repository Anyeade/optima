# Optima API - Database Setup Guide

## 🗄️ Supabase Database Configuration

Your Supabase project is configured and ready! Follow these steps to set up the database schema.

### ✅ Environment Configuration Complete
- **Project URL**: https://bazttzhnawopotzsfcqo.supabase.co
- **Environment variables**: Configured in `.env.local`
- **Application**: Running successfully with Supabase connection

### 📋 Database Schema Setup

#### Option 1: Using Supabase Dashboard (Recommended)

1. **Go to your Supabase Dashboard**
   - Visit: https://supabase.com/dashboard/project/bazttzhnawopotzsfcqo
   - Navigate to: **SQL Editor** → **New Query**

2. **Execute the following SQL commands one by one:**

```sql
-- Step 1: Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

```sql
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
```

```sql
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
```

```sql
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
```

```sql
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
```

```sql
-- Step 6: Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE processes ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_jobs ENABLE ROW LEVEL SECURITY;
```

```sql
-- Step 7: Create security policies for profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
```

```sql
-- Step 8: Create security policies for processes
CREATE POLICY "Users can view own processes" ON processes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create processes" ON processes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own processes" ON processes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own processes" ON processes FOR DELETE USING (auth.uid() = user_id);
```

```sql
-- Step 9: Create security policies for API logs
CREATE POLICY "Users can view own api logs" ON api_usage_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service can insert api logs" ON api_usage_logs FOR INSERT WITH CHECK (true);
```

```sql
-- Step 10: Create security policies for automation jobs
CREATE POLICY "Users can view own automation jobs" ON automation_jobs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create automation jobs" ON automation_jobs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own automation jobs" ON automation_jobs FOR UPDATE USING (auth.uid() = user_id);
```

```sql
-- Step 11: Create API key generation function
CREATE OR REPLACE FUNCTION generate_api_key()
RETURNS TEXT AS $$
BEGIN
  RETURN 'optima_' || encode(gen_random_bytes(32), 'hex');
END;
$$ LANGUAGE plpgsql;
```

```sql
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
```

```sql
-- Step 13: Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

```sql
-- Step 14: Create updated_at function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

```sql
-- Step 15: Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_processes_updated_at BEFORE UPDATE ON processes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_automation_jobs_updated_at BEFORE UPDATE ON automation_jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

```sql
-- Step 16: Create performance indexes
CREATE INDEX IF NOT EXISTS idx_profiles_api_key ON profiles(api_key);
CREATE INDEX IF NOT EXISTS idx_processes_user_id ON processes(user_id);
CREATE INDEX IF NOT EXISTS idx_processes_status ON processes(status);
CREATE INDEX IF NOT EXISTS idx_api_usage_logs_user_id ON api_usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_api_usage_logs_created_at ON api_usage_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_automation_jobs_user_id ON automation_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_automation_jobs_process_id ON automation_jobs(process_id);
CREATE INDEX IF NOT EXISTS idx_automation_jobs_status ON automation_jobs(status);
```

#### Option 2: Using the SQL File

1. Copy the contents of `supabase-schema.sql`
2. Paste into Supabase SQL Editor
3. Run the entire script at once

### 🔐 Authentication Setup

#### Enable Email Authentication

1. **Go to Authentication Settings**
   - Navigate to: **Authentication** → **Settings**
   - Under **Auth Providers**, ensure **Email** is enabled

2. **Configure Email Templates (Optional)**
   - Navigate to: **Authentication** → **Email Templates**
   - Customize signup confirmation and password reset emails

3. **Set Site URL**
   - In **Authentication** → **Settings** → **Site URL**
   - Add: `http://localhost:3000` (for development)
   - Add your production URL when deploying

### 🧪 Test the Setup

1. **Start the application**
   ```bash
   npm run dev
   ```

2. **Visit the application**
   - Go to: http://localhost:12000
   - Click "Get Started" or "Sign In"
   - Try creating a new account

3. **Verify database**
   - Check the `profiles` table in Supabase dashboard
   - New users should automatically get a profile with API key

### 🚀 Production Configuration

When deploying to production, update these environment variables:

```env
NEXT_PUBLIC_APP_URL=https://your-production-domain.com
NEXT_PUBLIC_API_BASE_URL=https://your-production-domain.com/api
```

And add your production URL to Supabase:
- **Authentication** → **Settings** → **Site URL**
- **Authentication** → **Settings** → **Redirect URLs**

### ✅ Verification Checklist

- [ ] All tables created successfully
- [ ] Row Level Security enabled
- [ ] Policies created for all tables
- [ ] Triggers and functions working
- [ ] Email authentication enabled
- [ ] Site URL configured
- [ ] Application connects to Supabase
- [ ] User registration creates profile automatically
- [ ] API key generated for new users

### 🆘 Troubleshooting

**Common Issues:**

1. **"relation does not exist" errors**
   - Ensure all tables are created in the `public` schema
   - Check that RLS policies are applied correctly

2. **Authentication not working**
   - Verify Site URL in Supabase settings
   - Check that email provider is enabled

3. **API key not generated**
   - Ensure the trigger `on_auth_user_created` is active
   - Check the `handle_new_user()` function exists

4. **Permission denied errors**
   - Verify RLS policies are correctly configured
   - Check that user is authenticated before accessing data

---

**Database setup complete!** Your Optima API platform is now ready for full functionality. 🎉