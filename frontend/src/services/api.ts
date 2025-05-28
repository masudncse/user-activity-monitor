import type { Screenshot, BrowserActivity } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = {
  async getScreenshots(): Promise<Screenshot[]> {
    const response = await fetch(`${API_BASE_URL}/screenshots`);
    if (!response.ok) throw new Error('Failed to fetch screenshots');
    return response.json();
  },

  async getBrowserActivities(): Promise<BrowserActivity[]> {
    const response = await fetch(`${API_BASE_URL}/activities`);
    if (!response.ok) throw new Error('Failed to fetch activities');
    return response.json();
  }
};