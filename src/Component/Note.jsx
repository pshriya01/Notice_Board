import React, { useRef, useState } from 'react'
import './Note.css';
import unpin from '../image/unpin.png'

export default function Note({ id, content, position, pinned, onDelete, onUpdate }) {
    const [isEditing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [isDragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const noteRef = useRef(null);

  const handleMouseDown = (e) => {
    if (!isEditing) {
      setDragging(true);
      const boundingBox = noteRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - boundingBox.left,
        y: e.clientY - boundingBox.top,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && !pinned) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      onUpdate(id, { position: { x: newX, y: newY } });
    }
  };
  

  

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleEditChange = (e) => {
    setEditedContent(e.target.value);
  };

  const handleEditBlur = () => {
    setEditing(false);
    onUpdate(id, { content: editedContent });
  };

  const handlePinClick = () => {
    onUpdate(id, { pinned: !pinned });
  };

  return (
    <div
    className={`note ${pinned ? 'pinned' : ''}`}
    style={{ left: position.x, top: position.y }}
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    // onClick={handleEditClick}
    ref={noteRef}
  >
    {pinned && <div className="pin-indicator">&#128204;</div>}
    <div className="buttons">
      <button style={{height:"20px",backgroundColor:pinned?"#ffbd59":"#ecb1d0"}} className="pin-button" onClick={handlePinClick}>{pinned ? <img  src={unpin}/> : '📌'}</button>
      <button style={{backgroundColor:pinned?"#ffbd59":"#ecb1d0"}} className="delete-button" onClick={handleDelete}>x</button>
    </div>
    {isEditing ? (
      <textarea
        type="text"
        value={editedContent}
        onChange={handleEditChange}
        onBlur={handleEditBlur}
        placeholder='Add Note'
        autoFocus
        rows="4" cols="30"
        disabled={false}
        style={{marginTop:"8px"}}
      />
    ) : (
      <div>
          <textarea
        type="text"
        value={editedContent}
        onChange={handleEditChange}
        onBlur={handleEditBlur}
        placeholder='Add Note'
        autoFocus
        rows="4" cols="30"
        
        disabled={true}
        style={{marginTop:"11px",fontSize:"20px"}}
      />
        <button className="edit-button" style={{backgroundColor:pinned?"#ffbd59":"#ecb1d0"}} onClick={handleEditClick}>Edit</button>

      </div>
    )}
  </div>
  );
};