# 🗄️ Database Setup Instructions

## 🚨 **IMPORTANT: Manual Setup Required**

The Supabase database setup must be done manually through the Supabase dashboard for security reasons. This is a one-time setup that takes about 2 minutes.

## 📋 **Step-by-Step Setup**

### 1. **Access Supabase SQL Editor**
Go to: https://supabase.com/dashboard/project/bazttzhnawopotzsfcqo/sql

### 2. **Copy the SQL Script**
Copy the entire contents of the `supabase-setup.sql` file in this repository.

### 3. **Execute the Script**
1. Paste the SQL script into the SQL Editor
2. Click the "Run" button
3. Wait for all statements to execute (should take 10-30 seconds)

### 4. **Verify Setup**
After running the script, you should see:
- ✅ `profiles` table created
- ✅ `processes` table created  
- ✅ `api_usage` table created
- ✅ Row Level Security enabled
- ✅ Security policies created
- ✅ Triggers set up

## 📊 **What the Script Creates**

### **Tables**
1. **`profiles`** - User account data and API keys
   - Links to Supabase auth users
   - Stores subscription tier, API limits, usage
   - Auto-generates unique API keys

2. **`processes`** - Business process management
   - User's optimization processes
   - Process data, insights, scores
   - Status tracking

3. **`api_usage`** - API call tracking
   - Endpoint usage analytics
   - Response times and status codes
   - Usage monitoring for billing

### **Security Features**
- **Row Level Security (RLS)** enabled on all tables
- **Policies** ensure users only see their own data
- **Triggers** automatically create profiles for new users
- **Foreign key constraints** maintain data integrity

### **Sample Data**
- Demo processes for testing
- Sample API usage data
- Default subscription limits

## 🧪 **Testing the Setup**

After running the SQL script, test the setup by:

1. **Sign up for a new account** on the platform
2. **Check the dashboard** - you should see sample data
3. **Try the API playground** - endpoints should work
4. **View your profile** - API key should be generated

## 🔧 **Troubleshooting**

### **Common Issues**

**"Table already exists" errors:**
- ✅ This is normal - the script uses `IF NOT EXISTS`
- The script is safe to run multiple times

**"Permission denied" errors:**
- ❌ Make sure you're logged into the correct Supabase project
- ❌ Verify you have admin access to the project

**"Function does not exist" errors:**
- ❌ Some functions may need to be created in order
- Try running the script in smaller chunks if needed

### **Manual Table Creation**

If the full script fails, you can create tables individually:

```sql
-- 1. Create profiles table first
CREATE TABLE profiles (
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

-- 2. Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create basic policy
CREATE POLICY "Users can view own profile" ON profiles
  FOR ALL USING (auth.uid() = id);
```

## 🎯 **Expected Results**

After successful setup:
- ✅ User registration creates profile automatically
- ✅ Dashboard shows user data and processes
- ✅ API playground works with real endpoints
- ✅ Usage tracking and limits function
- ✅ All security policies protect user data

## 📞 **Need Help?**

If you encounter issues:
1. Check the Supabase logs in the dashboard
2. Verify your project URL and keys in `.env.local`
3. Ensure you have the correct permissions
4. Try running smaller portions of the script

---

## 🚀 **Once Complete**

After the database is set up, your Optima API platform will be **100% functional** with:
- Real user authentication
- Data persistence
- API key management
- Usage tracking
- Process optimization
- Complete SaaS functionality

**The platform is production-ready once this setup is complete!**