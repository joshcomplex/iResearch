import { SearchResult } from '../types';

interface TavilySearchParams {
  query: string;
  search_depth?: 'basic' | 'advanced';
  include_answer?: boolean;
  max_results?: number;
}

interface TavilySearchResponse {
  results: Array<{
    title: string;
    url: string;
    content: string;
  }>;
}

export class TavilyAPI {
  private apiKey: string;
  private baseUrl = 'https://api.tavily.com';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async search(query: string): Promise<{ results: SearchResult[] }> {
    try {
      const params: TavilySearchParams = {
        query,
        search_depth: 'advanced',
        include_answer: false,
        max_results: 5
      };

      const response = await fetch(`${this.baseUrl}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: this.apiKey,
          ...params
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json() as TavilySearchResponse;
      
      return {
        results: data.results.map(result => ({
          title: result.title,
          url: result.url,
          content: result.content
        }))
      };
    } catch (error) {
      console.error('Tavily API error:', error);
      throw new Error('Search request failed');
    }
  }
}