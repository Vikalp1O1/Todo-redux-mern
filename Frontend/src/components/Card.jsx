// src/components/Card.jsx
import React from 'react';

function Card({ title, text, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 max-w-md w-full">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
      <p className="text-gray-600 mb-4">{text}</p>
      <div className="flex justify-end space-x-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Card;
