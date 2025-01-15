import React from 'react'

function Card({title,description,icon}) {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <span className="material-icons text-blue-600 text-6xl">{icon}</span>
    <h2 className="mt-4 text-xl font-semibold text-gray-800">{title}</h2>
    <p className="mt-2 text-gray-600 text-center">{description}</p>
    </div>
  );
}

export default Card
