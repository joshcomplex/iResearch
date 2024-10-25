import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { NoteEditor } from './components/NoteEditor';
import { ReportGenerator } from './components/ReportGenerator';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';
import { SearchResult, Note } from './types';
import { TavilyAPI } from './services/tavily';
import { BookOpen, FileText, Search as SearchIcon } from 'lucide-react';

function App() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'notes'>('search');
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const tavily = new TavilyAPI(import.meta.env.VITE_TAVILY_API_KEY);
      const response = await tavily.search(query);
      setSearchResults(response.results);
      setActiveTab('search');
    } catch (error) {
      setError('Failed to perform search. Please check your API key and try again.');
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNote = (content: string, source: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      content,
      timestamp: new Date().toISOString(),
      source
    };
    setNotes(prev => [newNote, ...prev]);
    setActiveTab('notes');
  };

  const handleUpdateNote = (updatedNote: Note) => {
    setNotes(prev => prev.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    ));
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">Research Assistant</h1>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
                {error}
              </div>
            )}
          </div>

          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('search')}
                  className={`py-4 px-1 inline-flex items-center border-b-2 ${
                    activeTab === 'search'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <SearchIcon className="h-5 w-5 mr-2" />
                  Search Results
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`py-4 px-1 inline-flex items-center border-b-2 ${
                    activeTab === 'notes'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Notes ({notes.length})
                </button>
              </nav>
            </div>
          </div>

          <div className="mt-6">
            {activeTab === 'search' ? (
              <>
                {isLoading ? (
                  <LoadingSpinner />
                ) : searchResults.length > 0 ? (
                  <SearchResults results={searchResults} onAddNote={handleAddNote} />
                ) : (
                  <div className="text-center text-gray-500 py-12">
                    <p>Start your research by entering a topic above</p>
                  </div>
                )}
              </>
            ) : (
              <>
                <ReportGenerator notes={notes} />
                <div className="space-y-6">
                  {notes.length > 0 ? (
                    notes.map(note => (
                      <NoteEditor
                        key={note.id}
                        note={note}
                        onSave={handleUpdateNote}
                        onDelete={handleDeleteNote}
                      />
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-12">
                      <p>No notes yet. Add notes from your search results.</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;