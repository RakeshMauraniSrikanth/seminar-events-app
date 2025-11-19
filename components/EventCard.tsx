import Image from "next/image"
import Link from "next/link"
import { Event } from "@/lib/constants"


const EventCard = ({ title, image, location, date, time, slug }: Event) => {
    return (
        <Link href={`/events/${slug}`} id="event-card">
            <Image src={image} alt={title} width={410} height={300} className="poster"></Image>

            <div className="flex flex-row gap-2">
                <Image src="/icons/pin.svg" alt="location" width={14} height={14}></Image>
                <p>{location}</p>

            </div>
            <p className="title flex">{title}</p>

            <div className="datetime">
                <div>
                    <Image src="/icons/calendar.svg" alt="date" width={14} height={14}></Image>
                    <p>{date}</p>
                </div>
                <div>
                    <Image src="/icons/clock.svg" alt="time" width={14} height={14}></Image>
                    <p>{time}</p>
                </div>
            </div>

        </Link>
    )
}

export default EventCard