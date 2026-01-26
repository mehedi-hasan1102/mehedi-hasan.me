import { NextResponse } from "next/server";

interface LocationData {
  city: string;
  region: string;
  country: string;
  countryCode: string;
}

/**
 * GET /api/get-location
 * Fetches current visitor's location server-side to bypass CORS
 */
export async function GET() {
  try {
    const fetchWithTimeout = async (url: string, timeoutMs = 2500) => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const resp = await fetch(url, { signal: controller.signal });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        return await resp.json();
      } finally {
        clearTimeout(timer);
      }
    };

    let locationData: Record<string, unknown>;

    try {
      // Primary provider (server-side, no CORS issues)
      locationData = await fetchWithTimeout("https://ipapi.co/json/");
    } catch {
      try {
        // Fallback provider
        locationData = await fetchWithTimeout("https://ipwho.is/");
      } catch {
        return NextResponse.json(
          { error: "Unable to determine location from any provider" },
          { status: 503 }
        );
      }
    }

    const location: LocationData = {
      city: (locationData.city as string) || "Unknown",
      region: ((locationData.region || locationData.state) as string) || "Unknown",
      country: ((locationData.country_name || locationData.country) as string) || "Unknown",
      countryCode: ((locationData.country_code as string) || "").toUpperCase() || "",
    };

    return NextResponse.json(
      { data: location, message: "Location fetched successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/get-location error:", error);
    return NextResponse.json(
      { error: "Failed to fetch location" },
      { status: 500 }
    );
  }
}
