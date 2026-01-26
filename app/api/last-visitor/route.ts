import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

interface LastVisitorData {
  city: string;
  region: string;
  country: string;
  countryCode: string;
  timestamp: string;
}

export const dynamic = "force-dynamic";

const COLLECTION = "visitor_locations";
const DB_NAME = process.env.MONGODB_DB || "portfolio";

/**
 * GET /api/last-visitor
 * Returns the most recent visitor location from MongoDB
 */
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection<LastVisitorData>(COLLECTION);

    const lastVisitor = await collection.findOne({}, { sort: { timestamp: -1 } });

    if (!lastVisitor) {
      return NextResponse.json(
        { data: null, message: "No previous visitor" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { data: lastVisitor, message: "Last visitor found" },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/last-visitor error:", error);
    return NextResponse.json(
      { error: "Failed to fetch last visitor" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/last-visitor
 * Inserts the current visitor location into MongoDB
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { city, region, country, countryCode } = body;

    // Validate required fields
    if (!city || !country || !countryCode) {
      return NextResponse.json(
        { error: "Missing required fields: city, country, countryCode" },
        { status: 400 }
      );
    }

    const lastVisitorData: LastVisitorData = {
      city,
      region: region || "Unknown",
      country,
      countryCode,
      timestamp: new Date().toISOString(),
    };

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection<LastVisitorData>(COLLECTION);

    await collection.insertOne(lastVisitorData);

    return NextResponse.json(
      { data: lastVisitorData, message: "Last visitor updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/last-visitor error:", error);
    return NextResponse.json(
      { error: "Failed to update last visitor" },
      { status: 500 }
    );
  }
}
