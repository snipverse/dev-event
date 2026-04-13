"use server";

import Event from "@/database/event.model";
import connectToDatabase from "@/lib/mongodb";

export type EventCardData = {
  _id: string;
  slug: string;
  title: string;
  location: string;
  date?: string;
  imageUrl?: string;
};

export const getEvents = async (): Promise<{ events: EventCardData[] }> => {
  try {
    await connectToDatabase();
    const events = await Event.find().sort({ createdAt: -1 }).lean();

    return {
      events: events.map((event) => ({
        _id: event._id.toString(),
        slug: event.slug,
        title: event.title,
        location: event.location,
        date: event.date,
        imageUrl: event.image,
      })),
    };
  } catch {
    return { events: [] };
  }
};

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectToDatabase();
    const event = await Event.findOne({ slug });
    if (!event) return [];

    return await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean();
  } catch {
    return [];
  }
};
