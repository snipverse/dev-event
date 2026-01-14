import ExploreBtn from "@/components/ExploreBtn"

const page = () => {
  return (
    <section id='home'>
      <h1 className="text-center">The Hub for every Dev <br /> Event you  Can't miss</h1>
      <p className="text-center mt-5">Hackthon, Meetups, and conferences, All in one Place.</p>
      <ExploreBtn />

      <div>
        <h3 className="mt-20 space-y-7">Featured Events</h3>
        <ul className="events">
          {[1,2,3,4,5].map((event)=> (
            <li key={event}>Event {event}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default page