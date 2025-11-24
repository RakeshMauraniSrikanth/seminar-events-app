"use client"
import React, { useState } from 'react'

const BookEvent = () => {

    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setTimeout(() => {
            setSubmitted(true)
        }, 1000);
    }
    return (
        <div id="book-event">
            {
                submitted ? (<p>
                    Thank you for submitting interest

                </p>) : (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h2>Enter email</h2>
                            <input type="email" placeholder='Enter your mail address' value={email} onChange={(e) => setEmail(e.target.value)} id="email" />
                        </div>
                        <button type="submit" className='button-submit'>Submit</button>
                    </form>
                )
            }
        </div>

    )
}

export default BookEvent