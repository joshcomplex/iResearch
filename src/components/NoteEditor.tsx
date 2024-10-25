import React, { useState } from 'react';
import { Note } from '../types';
import { Edit2, Save, Trash2 } from 'lucide-react';

interface NoteEditorProps {
  note: Note;
  onSave: (note: Note) => void;
  onDelete: (id: string) => void;
}

export function NoteEditor({ note, onSave, onDelete }: NoteEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    onSave({ ...note, content });
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            rows={4}
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Save className="w-4 h-4 mr-1" /> Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Edit2 className="w-4 h-4 mr-1" /> Edit
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="flex items-center px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              <Trash2 className="w-4 h-4 mr-1" /> Delete
            </button>
          </div>
        </div>
      )}
      {note.source && (
        <div className="mt-2 text-sm text-gray-500">
          Source: <a href={note.source} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{note.source}</a>
        </div>
      )}
    </div>
  );
}