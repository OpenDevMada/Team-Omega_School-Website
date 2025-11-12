import { useEffect, useState } from "react";
import type { Announcement } from "@/types/announcement";
import { getAnnouncements } from "@/services/announcement";

export const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getAnnouncements().then((res) => {
        if (!cancelled) {
          setAnnouncements(res?.announcement || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) {
          setError("Impossible de récupérer les annonces.");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { announcements, loading, error, refetch: getAnnouncements };
};
