import React from 'react'
import "./Board.css"
import { useState } from 'react';
import Note from "./Note";
const Board = () => {
    const [notes, setNotes] = useState([
        { id: 1, content: '', position: { x: 50, y: 50 }, pinned: false },
        { id: 2, content: '', position: { x: 200, y: 100 }, pinned: false },
    
      ]);
    
      const addNote = () => {
        const newNote = {
          id: notes.length + 1,
          content: '',
          position: { x: 100, y: 100 },
          pinned: false,
        };
        setNotes([...notes, newNote]);
      };
    
      const deleteNote = (id) => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
      };
    
      const updateNote = (id, updatedNote) => {
        const updatedNotes = notes.map((note) =>
          note.id === id ? { ...note, ...updatedNote } : note
        );
        setNotes(updatedNotes);
      };
    
      return (
        <div className="bulletin-board">
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            content={note.content}
            position={note.position}
            pinned={note.pinned}
            onDelete={deleteNote}
            onUpdate={updateNote}
          />
        ))}
        <button className="addbtn" onClick={addNote}>+</button>
      </div>
      );
}

export default Board