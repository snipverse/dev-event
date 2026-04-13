"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type EventCardData = {
  _id: string;
  slug: string;
  title: string;
  location: string;
  date?: string;
};

const EventsPage = () => {
  const [events, setEvents] = useState<EventCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const payload = await response.json();
        setEvents(payload?.events ?? []);
      } catch (error) {
        console.error(error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            All Events
          </h1>
          <p className="max-w-2xl text-sm text-white/70 sm:text-base">
            Explore the latest developer events, meetups, and conferences.
          </p>
        </div>

        {loading ? (
          <p className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-sm text-white/75">
            Loading...
          </p>
        ) : events.length === 0 ? (
          <p className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-sm text-white/75">
            No events found
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {events.map((event: EventCardData) => (
              <Link key={event._id} href={`/events/${event.slug}`}>
                <article className="cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-transform duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10">
                  <div className="flex h-full flex-col">
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <h2 className="text-lg font-semibold text-white">
                        {event.title}
                      </h2>
                      <p className="text-sm text-white/70">{event.location}</p>
                      {event.date ? (
                        <p className="text-xs uppercase tracking-wide text-white/45">
                          {event.date}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default EventsPage;
