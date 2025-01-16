import React from 'react';

function Card({ title, description, icon }) {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all duration-300 border border-cyan-500/20">
      {/* Icon */}
      <span className="material-icons text-6xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        {icon}
      </span>

      {/* Title */}
      <h2 className="mt-4 text-xl font-semibold text-white">{title}</h2>

      {/* Description */}
      <p className="mt-2 text-gray-300 text-center">{description}</p>
    </div>
  );
}

export default Card;