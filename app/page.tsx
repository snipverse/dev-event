import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { cacheLife } from "next/cache";
import { getEvents } from "@/lib/actions/event.actions";

const page = async () => {
  "use cache";
  cacheLife("hours");
  const payload = await getEvents();
  const events = payload?.events ?? [];

  return (
    <section id="home">
      <h1 className="text-center">
        The Hub for every Dev <br /> Event you Can&apos;t miss
      </h1>
      <p className="text-center mt-5">
        Hackthon, Meetups, and conferences, All in one Place.
      </p>
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {events &&
            events.length > 0 &&
            events.map((event) => (
              <li key={event.slug}>
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default page;
