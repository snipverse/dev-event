import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Event from '@/database/event.model';

// Define types for route parameters
interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    // Await params (required in Next.js 15+)
    const { slug } = await params;

    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return NextResponse.json(
        { message: 'Invalid or missing slug parameter' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Query event by slug
    const event = await Event.findOne({ slug: slug.toLowerCase().trim() });

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { message: `Event with slug "${slug}" not found` },
        { status: 404 }
      );
    }

    // Return event data
    return NextResponse.json(
      { message: 'Event fetched successfully', event },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching event by slug:', error);
    
    return NextResponse.json(
      { 
        message: 'Failed to fetch event', 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      },
      { status: 500 }
    );
  }
}
