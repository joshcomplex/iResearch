export interface SearchResult {
  title: string;
  url: string;
  content: string;
}

export interface Note {
  id: string;
  content: string;
  timestamp: string;
  source?: string;
}

export interface Report {
  title: string;
  notes: Note[];
  summary: string;
  lastModified: string;
}