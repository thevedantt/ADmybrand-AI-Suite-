import { NextRequest, NextResponse } from 'next/server';

interface DemoRequest {
  name: string;
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: DemoRequest = await request.json();
    const { name, email } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    console.log('Demo request received:', {
      name,
      email,
      timestamp: new Date().toISOString()
    });

    // Store the demo request in your database (optional)
    // This helps track leads and follow up

    return NextResponse.json({ 
      success: true, 
      message: 'Demo request submitted successfully! Your video will start downloading.',
      downloadUrl: '/AI_Generated_Demo_Video_Creation.mp4'
    });

  } catch (error) {
    console.error('Demo request error:', error);
    return NextResponse.json(
      { error: 'Failed to process demo request' },
      { status: 500 }
    );
  }
} 