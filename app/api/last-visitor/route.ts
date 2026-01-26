import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface LastVisitorData {
  city: string;
  region: string;
  country: string;
  countryCode: string;
  timestamp: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "last-visitor.json");

/**
 * Ensures data directory exists
 */
const ensureDataDir = () => {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

/**
 * Read last visitor from JSON file
 */
const readLastVisitor = (): LastVisitorData | null => {
  try {
    ensureDataDir();
    if (!fs.existsSync(DATA_FILE)) {
      return null;
    }
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data) as LastVisitorData;
  } catch (error) {
    console.error("Error reading last visitor:", error);
    return null;
  }
};

/**
 * Write last visitor to JSON file
 */
const writeLastVisitor = (data: LastVisitorData): boolean => {
  try {
    ensureDataDir();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing last visitor:", error);
    return false;
  }
};

/**
 * GET /api/last-visitor
 * Returns the last visitor location from the JSON file
 */
export async function GET() {
  try {
    const lastVisitor = readLastVisitor();
    
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
 * Updates the last visitor location in the JSON file
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

    const success = writeLastVisitor(lastVisitorData);

    if (!success) {
      return NextResponse.json(
        { error: "Failed to save visitor data" },
        { status: 500 }
      );
    }

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
