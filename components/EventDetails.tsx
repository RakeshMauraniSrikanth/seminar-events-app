import React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import EventCard from './EventCard'
import BookEvent from './BookEvent'
import { IEvent } from '@/database'
import { cacheLife } from 'next/cache'
import { getSimilarEventsBySlug } from '@/lib/actions/event.actions'

const EventDetailItem = ({ icon, alt, label }: { icon: string, alt: string, label: string }) => (
    <div className="flex flex-row gap-2 items-center">
        <Image src={icon} alt={alt} width={17} height={17}></Image>
        <p>{label}</p>
    </div>
)

const EventAgenda = ({ agenda }: { agenda: string[] }) => (
    <div className="agenda">
        <h2>Event Agenda</h2>
        <ul>
            {agenda.map((item) => (
                <li key={item} > {item}
                </li>
            ))}
        </ul>
    </div>
)

const EventTags = ({ tags }: { tags: string[] }) => (
    <div className="tags flex flex-row gap-2 flex-wrap">
        {tags.map((tag) => (
            <div className="pill" key={tag} >{tag}</div>
        ))}
    </div>
)

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const EventDetails = async ({ params }: { params: Promise<string> }) => {
    'use cache'
    cacheLife('hours')

    const slug = await params
    let eventData
    try {
        if (!BASE_URL) {
            console.error("Missing NEXT_PUBLIC_BASE_URL")
            return notFound()
        }
        const request = await fetch(`${BASE_URL}/api/events/${slug}`, { cache: "no-store" })
        if (!request.ok) {
            console.error("Event fetch failed", request.status, request.statusText)
            return notFound()
        }
        const { event } = await request.json()
        eventData = event
    } catch (err) {
        console.error("Error fetching event", err)
        return notFound()
    }
    const similarEvent: IEvent[] = await getSimilarEventsBySlug(slug)

    const {
        title,
        description,
        overview,
        location,
        date,
        time,
        mode,
        audience,
        organizer,
        tags,
        agenda,
        image
    } = eventData
    const booking = 10;

    if (!description) return notFound()
    console.log("The base URL", BASE_URL)

    return (
        <section id="event">
            <div className="header">
                <h1>Event Description</h1>
                <p className="mt-2">{description}</p>
            </div>
            <div className="details">
                {/* Left Section */}
                <div className="content">
                    <Image src={image} alt="Event banner" width={800} height={800} className="banner" />

                    <section className="flex-col-gap-2">
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>

                    <section className="flex-col-gap-2">
                        <h2>Event details</h2>
                        <EventDetailItem icon="/icons/pin.svg" alt="location" label={location} />
                        <EventDetailItem icon="/icons/calendar.svg" alt="date" label={date} />
                        <EventDetailItem icon="/icons/clock.svg" alt="time" label={time} />
                        <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
                        <EventDetailItem icon="/icons/audience.svg" alt="audience" label={audience} />

                    </section>

                    <EventAgenda agenda={agenda} />
                    <section className="flex-col-gap-2">
                        <h2>Organizer</h2>
                        <p>{organizer}</p>
                    </section>

                    <EventTags tags={tags} />

                </div>
                {/*Right Section */}
                <aside className="booking">
                    <div className="signup-card">
                        <h2>Book you seat</h2>
                        {booking > 0 ? (
                            <p className="text-sm">Join {booking} people who have already booked a spot</p>
                        ) : (
                            <p className="text-sm">Be the first to book a spot</p>
                        )
                        }
                        <BookEvent eventId={eventData._id} slug={eventData.slug} />
                    </div>
                </aside>
            </div>
            <section className="flex-col-gap-2 pt-20">

                <div >
                    <h2>Similar Event</h2>
                    <div className="events pt-20 mt-10">
                        {similarEvent.length > 0 && similarEvent.map((similarEvent: IEvent) => (
                            <EventCard key={similarEvent.title} {...similarEvent} />
                        ))}
                    </div>
                </div>
            </section>
        </section>
    )
}

export default EventDetails