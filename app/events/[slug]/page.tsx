import { notFound } from "next/navigation"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import Image from "next/image";
import { Book } from "lucide-react";
import BookEvents from "@/components/BookEvents";

const EventDetails = ({ icon, alt, label}: { icon: string, alt: string, label: string }) => {
  return (
    <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
  )
  
}

const EventAgenda = ({ agendaItems }: { agendaItems: string []}) => {
  return (
    <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {
        agendaItems.map((item)=> (
          <li key={item}>{item}</li>
        ))
      }
    </ul>

  </div>
  )
  
}

const EventTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-row gap-1.5 flex-wrap">
    {
      tags.map((tag)=> (
        <div className="pill" key={tag}>{tag}</div>
      ))
    }
  </div>
  )
}
const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }>}) => {
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);
  const { event: { description, image, title, overview, date, time, agenda, audience, tags, organizer, location, mode} } = await request.json();

  if(!description) return notFound();

  const bookings = 10;

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{description}</p>
      </div>

      <div className="details">
        {/* {Left hand side- event content} */}
        <div className="content">
          <Image src={image} alt="Event Banner" width={800} height={800} className="banner" />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetails icon="/icons/calendar.svg" alt="Calendar icon" label={date} />
            <EventDetails icon="/icons/clock.svg" alt="Clock icon" label={time} />
            <EventDetails icon="/icons/pin.svg" alt="Calendar icon" label={location} />
            <EventDetails icon="/icons/mode.svg" alt="Clock icon" label={mode} />
            <EventDetails icon="/icons/audience.svg" alt="Clock icon" label={audience} />
          </section>

          <EventAgenda agendaItems={JSON.parse(agenda[0])}/>

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tags={JSON.parse(tags[0])}/>
        </div>
        {/* {Right hand side - booking event} */}
          <aside className="booking">
            <div className="sign-card">
              <h2>Book Your Spot</h2>
              {bookings > 0 ? (
                <p className="text-sm">
                  Join {bookings} people who have already booked their spot!
                </p>
              ):(
                <p className="text-sm">Be the first to book your spot!</p>
              )}

              <BookEvents />
            </div>
          </aside>

      </div>
    </section>
  )
}

export default EventDetailsPage;