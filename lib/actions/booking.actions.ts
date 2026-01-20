"use server";
import Booking from "@/database/booking.model";
import connectToDatabase from "@/lib/mongodb";


export const createBooking = async ({ eventId, slug, email }: { eventId: string; slug: string; email: string }) => {
  try {
    await connectToDatabase();

    const existingBooking = await Booking.findOne({ eventId, email });
    if (existingBooking) {
      return { success: false, error: 'You have already booked this event' };
    }

    await Booking.create({ eventId, slug, email });
    
    return { 
      success: true, 
    };
  } catch (e) {
    console.error('create booking failed');
    return { success: false};
  }
}