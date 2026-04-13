"use server";
import Booking from "@/database/booking.model";
import connectToDatabase from "@/lib/mongodb";
import mongoose from "mongoose";

export const createBooking = async ({
  eventId,
  slug,
  email,
}: {
  eventId: string;
  slug: string;
  email: string;
}) => {
  try {
    await connectToDatabase();
    const objectId = new mongoose.Types.ObjectId(eventId);

    const existingBooking = await Booking.findOne({ eventId: objectId, email });
    if (existingBooking) {
      return { success: false, error: "You have already booked this event" };
    }

    await Booking.create({ eventId: objectId, slug, email });

    return {
      success: true,
    };
  } catch (error) {
    console.error("create booking failed", error);
    return { success: false, error: "Failed to create booking" };
  }
};

export const getBookingCount = async (eventId: string) => {
  try {
    await connectToDatabase();
    const objectId = new mongoose.Types.ObjectId(eventId);
    return await Booking.countDocuments({ eventId: objectId });
  } catch {
    return 0;
  }
};
