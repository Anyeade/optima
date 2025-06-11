import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest
) {
  try {
    const { searchParams } = new URL(request.url)
    const processId = searchParams.get('id')
    if (!processId) {
      return NextResponse.json(
        { error: 'Process ID is required' },
        { status: 400 }
      )
    }
    
    // Simulate real-time insights
    const mockInsights = {
      process_id: processId,
      current_score: Math.floor(Math.random() * 30) + 70, // 70-100
      trend: Math.random() > 0.5 ? "improving" : "stable",
      metrics: {
        avg_completion_time: Math.floor(Math.random() * 1000) + 1500, // 1500-2500ms
        success_rate: Math.random() * 0.2 + 0.8, // 0.8-1.0
        cost_per_completion: Math.random() * 10 + 5, // $5-15
        volume_last_24h: Math.floor(Math.random() * 200) + 50 // 50-250
      },
      predictions: {
        next_week_volume: Math.floor(Math.random() * 1000) + 500,
        optimization_potential: `${Math.floor(Math.random() * 30) + 10}%`,
        risk_factors: ["peak_traffic_monday", "holiday_season"].slice(0, Math.floor(Math.random() * 2) + 1)
      },
      alerts: [
        {
          type: "performance",
          message: "Success rate dropped 3% in last hour",
          severity: "medium"
        },
        {
          type: "volume",
          message: "Traffic spike detected - 25% above normal",
          severity: "low"
        }
      ].slice(0, Math.floor(Math.random() * 2) + 1),
      last_updated: new Date().toISOString()
    }

    return NextResponse.json(mockInsights)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch insights' },
      { status: 500 }
    )
  }
}