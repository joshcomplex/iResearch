import React from 'react';
import { SearchResult } from '../types';
import { PlusCircle } from 'lucide-react';

interface SearchResultsProps {
  results: SearchResult[];
  onAddNote: (content: string, source: string) => void;
}

export function SearchResults({ results, onAddNote }: SearchResultsProps) {
  return (
    <div className="space-y-6">
      {results.map((result, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{result.title}</h3>
          <p className="text-gray-600 mb-4">{result.content}</p>
          <div className="flex justify-between items-center">
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              Read more →
            </a>
            <button
              onClick={() => onAddNote(result.content, result.url)}
              className="flex items-center px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <PlusCircle className="w-4 h-4 mr-1" /> Add Note
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}