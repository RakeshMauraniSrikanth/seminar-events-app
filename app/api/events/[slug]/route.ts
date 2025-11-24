import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Event } from "@/database";

interface Params {
    params: {
        slug?: string;
    };
}

/**
 * GET /api/events/[slug]
 * Fetch a single event by its slug.
 */
export async function GET(req: NextRequest, { params }: Params) {
    try {
        await dbConnect();

        const { slug } = await params;

        // Validate slug
        if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
            return NextResponse.json(
                { error: "A valid slug is required." },
                { status: 400 }
            );
        }

        const sanatizedSlug = slug.trim().toLowerCase()

        // Query event
        const event = await Event.findOne({ slug: sanatizedSlug }).lean();

        if (!event) {
            return NextResponse.json(
                { error: `Event with slug '${sanatizedSlug}' not found.` },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Event fetched suuessfully',event }, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch event by slug:", error);

        return NextResponse.json(
            { error: "An unexpected error occurred while fetching the event." },
            { status: 500 }
        );
    }
}
