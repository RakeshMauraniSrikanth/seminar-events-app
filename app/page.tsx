import EventCard from '@/components/EventCard'
import ExploreBtn from '@/components/ExploreBtn'
import { events } from '@/lib/constants'
import React from 'react'

const Page = () => {

   

    return (
        <section className='text-center'>
            <h1>The hub for every dev <br /> Event you cannot miss</h1>
            <p className='mt-5'>Meetups, hackathons and conferences all in one place</p>

            <ExploreBtn />
            <div className='mt-20 space-y-7'>
                <h3>Featured</h3>
                <ul className='events'>
                    {events.map((event) => (
                        <li key={event.title}>
                            <EventCard {...event}/>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Page