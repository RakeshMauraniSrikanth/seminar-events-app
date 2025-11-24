import EventCard from '@/components/EventCard'
import ExploreBtn from '@/components/ExploreBtn'
import { IEvent } from '@/database'
import { cacheLife } from 'next/cache'
import events from '@/lib/constants'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const Page = async () => {
    'use cache'
    cacheLife('hours') 
    // const response = await fetch(`${BASE_URL}/api/events`)
    // const { events } = await response.json()

    

    return (
        <section className='text-center'>
            <h1>The hub for every dev <br /> Event you cannot miss</h1>
            <p className='mt-5'>Meetups, hackathons and conferences all in one place</p>

            <ExploreBtn />
            <div className='mt-20 space-y-7'>
                <h3>Featured</h3>
                <ul className='events list-none p-0 m-0'>
                    {events && events.length > 0 && events.map((event: IEvent) => (
                        <li key={event.title}>
                            <EventCard {...event} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Page