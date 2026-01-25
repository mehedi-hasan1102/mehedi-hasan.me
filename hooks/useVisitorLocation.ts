import { useEffect, useState } from "react";

interface LocationData {
  city: string;
  country: string;
  countryCode: string;
}

export const useVisitorLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    const fetchLocation = async () => {
      try {
        const cached = localStorage.getItem("visitorLocation");
        if (cached) {
          setLocation(JSON.parse(cached));
          setLoading(false);
          return;
        }

        if (typeof navigator !== "undefined" && !navigator.onLine) {
          setLoading(false);
          return;
        }

        let data: any;
        try {
          // Primary provider
          data = await fetchWithTimeout("https://ipapi.co/json/");
        } catch {
          // Fallback provider (no API key, CORS-friendly)
          data = await fetchWithTimeout("https://ipwho.is/");
        }

        const locationData: LocationData = {
          city: data.city || "Unknown",
          country: data.country_name || data.country || "Unknown",
          countryCode: (data.country_code || data.country_code)?.toString().toUpperCase() || "",
        };

        localStorage.setItem("visitorLocation", JSON.stringify(locationData));
        setLocation(locationData);
      } catch (error) {
        console.error("Error fetching location:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  return { location, loading };
};
