import mongoose, { Schema, Document, Model } from 'mongoose';

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Booking schema definition
const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v: string): boolean {
          // Email validation regex
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Please provide a valid email address',
      },
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Pre-save hook: Verify that the referenced event exists
BookingSchema.pre('save', async function () {
  // Only validate eventId if it's modified or new document
  if (this.isModified('eventId') || this.isNew) {
    try {
      const Event = mongoose.model('Event');
      const eventExists = await Event.findById(this.eventId);

      if (!eventExists) {
        throw new Error('Cannot create booking: Referenced event does not exist');
      }
    } catch {
      throw new Error('Error validating event reference');
    }
  }
});

// Create index on eventId for faster lookup of bookings by event
BookingSchema.index({ eventId: 1 });

// Compound index for querying bookings by event and email (prevents duplicate bookings)
BookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

// Export Booking model
const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
