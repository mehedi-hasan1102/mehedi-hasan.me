import { useEffect, useState } from "react";

interface LastVisitorData {
  city: string;
  region: string;
  country: string;
  countryCode: string;
  timestamp: string;
}

export const useVisitorLocation = () => {
  const [lastVisitor, setLastVisitor] = useState<LastVisitorData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateLastVisitor = async () => {
      try {
        // Check if online
        if (typeof navigator !== "undefined" && !navigator.onLine) {
          // Offline: fetch from API without updating
          await fetchLastVisitorFromAPI();
          return;
        }

        // 1. Fetch current visitor's location via backend (no CORS issues)
        const locationResponse = await fetch("/api/get-location", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (locationResponse.ok) {
          const locationData = await locationResponse.json();
          const currentLocation = locationData.data;

          // 2. POST current location to update last visitor
          await fetch("/api/last-visitor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(currentLocation),
          }).catch((err) => {
            console.warn("Failed to update last visitor:", err);
          });
        }

        // 3. Fetch and display last visitor
        await fetchLastVisitorFromAPI();
      } catch (error) {
        console.error("Error in updateLastVisitor:", error);
        // Try to fetch last visitor even if current location failed
        await fetchLastVisitorFromAPI();
      } finally {
        setLoading(false);
      }
    };

    const fetchLastVisitorFromAPI = async () => {
      try {
        const response = await fetch("/api/last-visitor", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            setLastVisitor(data.data);
          }
        }
      } catch (error) {
        console.error("Error fetching last visitor from API:", error);
      }
    };

    updateLastVisitor();
  }, []);

  return { lastVisitor, loading };
};
