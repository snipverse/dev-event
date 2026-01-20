"use client";
import { createBooking } from "@/lib/actions/booking.actions";
import { useState } from "react";
import posthog from "posthog-js";

const BookEvents = ({ eventId, slug }: { eventId: string, slug: string }) => {
  const [email, setEmail] = useState(""); 
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const { success, error: bookingError } = await createBooking({ eventId, slug, email });

    if (success) {
      setSubmitted(true);
      posthog.capture('event_booked', { eventId, slug, email });
    } else {
      console.error('Booking failed:', bookingError);
      setError(typeof bookingError === 'string' ? bookingError : 'Booking failed');
      posthog.captureException(bookingError);
    }
  }

  return (
    <div id="book-event">
      {
        submitted ? (
          <p className="text-sm">Thank you for Signing Up!</p>
        ): (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email address"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" className="button-submit">Submit</button>
            </div>
          </form>
        )
      }
    </div>
  )
}

export default BookEvents;