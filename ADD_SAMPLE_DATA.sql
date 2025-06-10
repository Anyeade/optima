-- =====================================================
-- OPTIMA API - SAMPLE DATA (OPTIONAL)
-- =====================================================
-- Run this AFTER you have created a user account
-- Replace 'YOUR_USER_ID' with your actual user ID from auth.users
-- =====================================================

-- First, find your user ID by running:
-- SELECT id, email FROM auth.users;

-- Then replace 'YOUR_USER_ID' below with your actual UUID

-- Sample processes for demonstration
INSERT INTO processes (id, user_id, name, description, status, optimization_score, process_data, insights) VALUES
(
  gen_random_uuid(),
  'YOUR_USER_ID', -- Replace with your actual user ID
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
  'YOUR_USER_ID', -- Replace with your actual user ID
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
  'YOUR_USER_ID', -- Replace with your actual user ID
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

-- Sample API usage logs
INSERT INTO api_usage_logs (user_id, endpoint, method, status_code, response_time_ms) VALUES
('YOUR_USER_ID', '/api/v1/processes/analyze', 'POST', 200, 1250),
('YOUR_USER_ID', '/api/v1/processes/analyze', 'POST', 200, 980),
('YOUR_USER_ID', '/api/v1/automation/trigger', 'POST', 200, 2100),
('YOUR_USER_ID', '/api/v1/processes/insights', 'GET', 200, 450),
('YOUR_USER_ID', '/api/v1/processes/analyze', 'POST', 200, 1100);

-- Sample automation jobs
INSERT INTO automation_jobs (user_id, process_id, job_type, status, progress, result) VALUES
(
  'YOUR_USER_ID',
  (SELECT id FROM processes WHERE name = 'Customer Onboarding' AND user_id = 'YOUR_USER_ID' LIMIT 1),
  'workflow_optimization',
  'completed',
  100,
  '{
    "optimizations_applied": [
      {"type": "email_automation", "description": "Added automated reminder emails", "impact": "12% improvement"},
      {"type": "form_simplification", "description": "Reduced form fields by 40%", "impact": "8% improvement"}
    ],
    "new_metrics": {
      "total_duration": 2200,
      "overall_success_rate": 0.94,
      "total_cost": 5.80
    }
  }'
),
(
  'YOUR_USER_ID',
  (SELECT id FROM processes WHERE name = 'E-commerce Checkout' AND user_id = 'YOUR_USER_ID' LIMIT 1),
  'conversion_optimization',
  'running',
  65,
  '{
    "current_optimizations": [
      {"type": "form_optimization", "description": "A/B testing checkout layouts", "status": "in_progress"}
    ]
  }'
);