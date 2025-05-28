export interface Screenshot {
  id: number;
  path: string;
  taken_at: string;
  created_at: string;
  updated_at: string;
}

export interface BrowserActivity {
  id: number;
  url: string;
  title: string;
  tab_id: string;
  window_id: string;
  started_at: string;
  ended_at: string | null;
  created_at: string;
  updated_at: string;
}