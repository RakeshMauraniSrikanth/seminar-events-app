'use client'
import React, { useState } from 'react'

const CreateEvent = () => {
    const [title, setTitle] = useState('')
    const [venue, setVenue] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [image, setImage] = useState<File | null>(null)
    const [description, setDescription] = useState('')
    const [overview, setOverview] = useState('')
    const [audience, setAudience] = useState('')
    const [organizer, setOrganizers] = useState('')
    const [mode, setMode] = useState('')
    const [location, setLocation] = useState('')
    const [tags, setTags] = useState<string[]>([])
    const [agenda, setAgenda] = useState<string[]>([])





    const handleEventSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData();

        formData.append("title", title);
        formData.append("venue", venue);
        formData.append("date", date);
        formData.append("time", time);
        formData.append("description", description);
        formData.append("overview", overview);
        formData.append("audience", audience);
        formData.append("organizer", organizer);
        formData.append("mode", mode);
        formData.append("location", location);

        // Arrays MUST be stringified
        formData.append("tags", JSON.stringify(tags));
        formData.append("agenda", JSON.stringify(agenda));

        // Image
        if (image) {
            formData.append("image", image)   
        }
        console.log("The form data", formData)

        const res = await fetch("/api/events", {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        console.log("Created:", data);
    }

    return (
        <section className="booking">
            <form onSubmit={handleEventSubmit} className="form-card">
                <h1 className="text-gradient text-4xl font-bold">Create Event</h1>

                {/* Title */}
                <section className='flex flex-row gap-4'>
                    <div className="form-group flex flex-col gap-2 flex-1">
                        <h2>Event Title</h2>
                        <input className="form-input" type="text" placeholder="Enter event title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    {/* Location */}
                    <div className="form-group flex flex-col gap-2 flex-1">
                        <h2>Location</h2>
                        <select
                            className="form-select"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <option value="sanfrancisco">San Francisco</option>
                            <option value="seattle">Seattle</option>
                        </select>
                    </div>
                </section>
                {/* Venue */}
                <section className='flex flex-row gap-4'>
                    <div className="form-group flex flex-col gap-2 flex-1">
                        <h2>Venue</h2>
                        <input className="form-input" type="text" placeholder="Enter event venue" value={venue} onChange={(e) => setVenue(e.target.value)} />
                    </div>
                    <div className="form-group flex flex-col gap-2 flex-1">
                        <h2>Mode</h2>
                        <select
                            className="form-select"
                            value={mode}
                            onChange={(e) => { setMode(e.target.value) }}
                        >
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                        </select>
                    </div>
                </section>

                <section className='flex flex-row gap-4'>

                    {/* Date */}
                    <div className="form-group flex flex-col gap-2 flex-1">
                        <h2>Date</h2>
                        <input className="form-date form-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>

                    {/* Time */}
                    <div className="form-group form-group flex flex-col gap-2 flex-1">
                        <h2>Time</h2>
                        <input className="form-time form-input" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                    </div>
                </section>
                {/* Mode */}


                <section className='flex flex-row gap-4'>

                    {/* Tags */}
                    <div className="form-group form-group flex flex-col gap-2 flex-1">
                        <h2>Tags</h2>
                        <input className="form-input" type="text" placeholder="Enter event tags" onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))} />
                    </div>

                    {/* Image Upload */}
                    <div className="form-group form-group flex flex-col gap-2 flex-1">
                        <h2>Upload Image</h2>
                        <input className="form-file" type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] ?? null)} />
                    </div>
                </section>

                {/* Description Sections */}
                <section className="flex flex-col gap-6">
                    <div className="form-group">
                        <h2>Event Description</h2>
                        <textarea className="form-textarea" rows={5} placeholder="Enter event description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <h2>Overview</h2>
                        <textarea className="form-textarea" rows={3} placeholder="Enter event overview" value={overview} onChange={(e) => setOverview(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <h2>Audience</h2>
                        <textarea className="form-textarea" rows={3} placeholder="Enter event audience" value={audience} onChange={(e) => setAudience(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <h2>Organizers</h2>
                        <textarea className="form-textarea" rows={3} placeholder="Enter event organizers" value={organizer} onChange={(e) => setOrganizers(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <h2>Agenda</h2>
                        <textarea className="form-textarea" rows={5} placeholder="Enter event agenda"
                            onChange={(e) => setAgenda(e.target.value.split('\n').map(item => item.trim()).filter(Boolean))}
                        />
                    </div>
                </section>

                <button type="submit" className="form-submit">
                    Create Event
                </button>
            </form>
        </section>
    )
}

export default CreateEvent
