import { NextRequest, NextResponse } from 'next/server'

interface Step {
  name?: string
  duration?: number
  success_rate?: number
  cost?: number
}

interface ProcessAnalysisRequest {
  steps?: Step[]
}

export async function POST(request: NextRequest) {
  try {
    const body: ProcessAnalysisRequest = await request.json()
    
    // Simulate AI processing
    const mockResponse = {
      process_id: `proc_${Math.random().toString(36).substring(2, 15)}`,
      optimization_score: Math.floor(Math.random() * 30) + 70, // 70-100
      current_metrics: {
        avg_completion_time: (body.steps ?? []).reduce<number>((sum: number, step: Step) => sum + (step?.duration || 0), 0) || 2700,
        success_rate: (body.steps ?? []).reduce<number>((sum: number, step: Step) => sum + (step?.success_rate || 0), 0) / ((body.steps?.length || 1)) || 0.91,
        total_cost: (body.steps ?? []).reduce<number>((sum: number, step: Step) => sum + (step?.cost || 0), 0) || 6.50
      },
      bottlenecks: [
        {
          step: body.steps?.[1]?.name || "Email Verification",
          issue: "High abandonment rate",
          impact: "medium",
          suggested_fix: "Implement automated email reminders"
        }
      ],
      recommendations: [
        {
          type: "automation",
          description: "Add automated email reminders after 30 minutes",
          estimated_improvement: "15% success rate increase",
          implementation_effort: "low"
        },
        {
          type: "workflow_optimization", 
          description: "Combine profile setup with account creation",
          estimated_improvement: "25% time reduction",
          implementation_effort: "medium"
        }
      ],
      predicted_improvements: {
        new_completion_time: Math.floor((body.steps?.reduce((sum: number, step: Step) => sum + (step.duration || 0), 0) || 2700) * 0.75),
        new_success_rate: 0.96,
        cost_savings: 1.20
      }
    }

    return NextResponse.json(mockResponse)
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}