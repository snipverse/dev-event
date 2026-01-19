import { NextRequest, NextResponse } from "next/server" ;
import { v2 as cloudinary } from "cloudinary"

import connectToDatabase from "@/lib/mongodb";
import Event from "@/database/event.model"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await req.formData();

    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch(e) {
      return NextResponse.json({ message: 'Invalid JSON data format'}, { status: 400 })
    }

    const file = formData.get('image') as File;

    if(!file) return NextResponse.json({ message: 'Image file is required' }, { status: 400 })

    const tags = JSON.parse(formData.get('tags') as string);

    const agenda = JSON.parse(formData.get('agenda') as string);

    console.log('Starting cloudinary upload...');
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject)=>{
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          resource_type: 'image', 
          folder: 'DevEvent',
          timeout: 60000
        }, 
        (error, results) => {
          if(error) {
            console.error('Cloudinary upload error:', error);
            return reject(error);
          }
          console.log('Cloudinary upload successful');
          resolve(results);
        }
      );
      
      uploadStream.end(buffer);
    });


    event.image = (uploadResult as {secure_url: string}).secure_url;

    const createdEvent = await Event.create({ 
      ...event,
      tags: tags,
      agenda: agenda,
     });

    return NextResponse.json({ message: 'Event created successfully', event: createdEvent }, { status: 201 });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Event creation failed', error : e instanceof Error ? e.message : 'Unknown error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    const events = await Event.find().sort({ createdAt: -1});

    return NextResponse.json({ message: 'Events fetched successfully', events}, { status: 200 })
  } catch (e) {
    return NextResponse.json({ message: 'Failed to fetch the events', error: e}, { status: 500 })
  }
}

// a route that accept a slug as input -> returns the event details