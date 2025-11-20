import { Schema, Types, model, models } from "mongoose";

export interface IBooking extends Document {
    email: string;
    eventId: Types.ObjectId;

    createdAt: Date;
    updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>({
    eventId: { type: Schema.Types.ObjectId, required: [true, 'Event ID is required'], ref: 'Event' },
    email: {
        type: String, required: [true, 'Email is required'], trim: true, lowercase: true,
        validate: function (email: string) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
        message: 'Invalid email format'
    },
},
    {
        timestamps: true,
    })

BookingSchema.pre('save', async function (next) {
    const booking = this as IBooking;

    // Check if a booking already exists for this email + event combo
    const existingBooking = await model("Booking").findOne({
        email: booking.email,
        eventId: booking.eventId,
    });

    if (existingBooking) {
        // Throw a mongoose validation error
        const error = new Error("You have already booked this event");
        return next(error);
    }
    next();
});

BookingSchema.index({ eventId: 1 }, { unique: true });

BookingSchema.index({ eventId: 1, createdAt: -1 });

BookingSchema.index({ email: 1 });
const Booking = models.Booking || model<IBooking>("Booking", BookingSchema);

export default Booking;