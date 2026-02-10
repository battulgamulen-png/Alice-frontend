"use client";

import React, { useState } from "react";

interface Note {
  id: number;
  text: string;
  completed: boolean;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, text: "Pay electricity bill", completed: false },
    { id: 2, text: "Transfer to savings account", completed: true },
    { id: 3, text: "Check credit card statement", completed: false },
  ]);

  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes([
      ...notes,
      { id: Date.now(), text: newNote.trim(), completed: false },
    ]);
    setNewNote("");
  };

  const toggleComplete = (id: number) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note,
      ),
    );
  };

  const removeNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="w-full max-w-md bg-white text-black rounded-3xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Reminders & Notes</h2>

      {/* Add new note */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add new note..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={addNote}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
        >
          Add
        </button>
      </div>

      {/* Notes list */}
      <ul className="space-y-2 max-h-60 overflow-y-auto">
        {notes.map((note) => (
          <li
            key={note.id}
            className="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2 hover:bg-gray-200 transition"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={note.completed}
                onChange={() => toggleComplete(note.id)}
                className="w-4 h-4 accent-purple-500"
              />
              <span
                className={note.completed ? "line-through text-gray-400" : ""}
              >
                {note.text}
              </span>
            </div>
            <button
              onClick={() => removeNote(note.id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
