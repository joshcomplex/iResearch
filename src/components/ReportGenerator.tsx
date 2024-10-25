import React, { useState } from 'react';
import { Note } from '../types';
import { FileText, Download } from 'lucide-react';

interface ReportGeneratorProps {
  notes: Note[];
}

export function ReportGenerator({ notes }: ReportGeneratorProps) {
  const [title, setTitle] = useState('');

  const generateReport = () => {
    const report = {
      title: title || 'Research Report',
      notes,
      summary: notes.map(note => note.content).join('\n\n'),
      lastModified: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.title.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex items-center mb-4">
        <FileText className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Generate Report</h2>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="report-title" className="block text-sm font-medium text-gray-700 mb-1">
            Report Title
          </label>
          <input
            type="text"
            id="report-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter report title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <button
          onClick={generateReport}
          disabled={notes.length === 0}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </button>
      </div>
    </div>
  );
}