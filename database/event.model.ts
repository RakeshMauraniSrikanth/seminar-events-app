import { Schema, model, models, Document } from "mongoose";

export interface IEvent extends Document {
    title: string;
    slug: string;
    image: string;
    location: string;
    date: string;
    time: string;
    description: string;
    overview: string;
    audience: string;
    agenda: string[];
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    mode: string;
    venue: string;
    organizer: string;
}

const EventSchema = new Schema<IEvent>(
    {
        title: { type: String, required: [true, 'Title is required'], trim: true, maxlength: [100, 'Title must be at most 100 characters long'] },
        slug: { type: String, unique: true, lowercase: true, trim: true },
        image: { type: String, required: [true, 'Image is required'] },
        location: { type: String, required: [true, 'Location is required'] },
        date: { type: String, required: [true, 'Date is required'] },
        time: { type: String, required: [true, 'Time is required'] },
        description: { type: String, required: [true, 'Description is required'], maxlength: [1000, 'Description must be at most 1000 characters long'] },
        overview: { type: String, required: [true, 'Overview is required'], maxlength: [500, 'Overview must be at most 500 characters long'] },
        audience: { type: String, required: [true, 'Audience is required'] },
        agenda: { type: [String], required: [true, 'Agenda is required'] },
        tags: {
            type: [String], required: [true, 'Tags are required'], validate: {
                validator: (v: string[]) => v.length > 0,
                message: 'There must be at least one tag'
            }
        },
        mode: {
            type: String, required: [true, 'Mode is required'], enum: {
                values: ['online', 'offline', 'hybrid'],
                message: 'Mode must be either online, offline, or hybrid'
            }
        },
        venue: { type: String, required: [true, 'Venue is required'] },
        organizer: { type: String, required: [true, 'Organizer is required'] },
    },
    {
        timestamps: true,
    }
)

EventSchema.pre('save', function (next) {
    const event = this as IEvent;

    if (event.isModified('title') || event.isNew) {
        event.slug = generateSlug(event.title);
    }

    if (event.isModified('date')) {
        event.date = normalizeDate(event.date);
    }

    if (event.isModified('time')) {
        event.time = normalizeTime(event.time);
    }

    next();
})

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function normalizeDate(dateStr: string): string {
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) {
        throw new Error('Invalid date format');
    }
    return date.toISOString().split('T')[0];
}

function normalizeTime(timeStr: string): string {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const match = timeStr.trim().match(regex);

    if (!match) {
        throw new Error('Invalid time format. Expected HH:MM in 24-hour format');
    }

    const hours = parseInt(match[1])
    const minutes = match[2]
    const period = match[4]?.toUpperCase() 
    
    if(period) {
        if (period === 'PM' && hours < 12) {
            return `${hours + 12}:${minutes}`;
        } else if (period === 'AM' && hours === 12) {
            return `00:${minutes}`;
        }
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes}`;


}

EventSchema.index({ slug: 1 }, { unique: true });
EventSchema.index({ date: 1, mode: 1 });

const Event = models.Event || model<IEvent>('Event', EventSchema);

export default Event;