'use client';

import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { ScreenshotGrid } from '@/components/ScreenshotGrid';
import { ActivityTable } from '@/components/ActivityTable';
import type { Screenshot, BrowserActivity } from '@/types';

export default function Dashboard() {
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [activities, setActivities] = useState<BrowserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [screenshotsData, activitiesData] = await Promise.all([
          api.getScreenshots(),
          api.getBrowserActivities()
        ]);

        setScreenshots(screenshotsData);
        setActivities(activitiesData);
        setError(null);
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Employee Monitoring Dashboard</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Screenshots</h2>
        <ScreenshotGrid screenshots={screenshots} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Browser Activities</h2>
        <ActivityTable activities={activities} />
      </section>
    </main>
  );
}
