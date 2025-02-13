import React from 'react';
import { useTheme } from '../hooks/useTheme'; // Custom hook for GlobalTheme

function Card({ title, description, icon }) {
  const { GlobalTheme } = useTheme(); // Access the global theme

  return (
    <div
      className="flex flex-col items-center p-6 rounded-2xl shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl"
      style={{
        background: GlobalTheme === 'dark'
          ? 'linear-gradient(135deg, rgba(30,30,30,0.85), rgba(50,50,50,0.85))'
          : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)", // For Safari
        border: GlobalTheme === 'dark' ? '1px solid #333' : '1px solid #ddd',
        color: GlobalTheme === 'dark' ? '#ffffff' : '#333',
        boxShadow: GlobalTheme === 'dark' 
          ? '0 4px 10px rgba(0,255,255,0.1), 0 0 20px rgba(0,255,255,0.15)' 
          : '0 4px 10px rgba(0,0,0,0.1)',
        transition: "all 0.3s ease-in-out",
      }}
    >
      {/* Icon */}
      <span
        className="text-5xl mb-4"
        style={{
          color: GlobalTheme === 'dark' ? '#4ec9b0' : '#0073e6',
          textShadow: GlobalTheme === 'dark' ? '0 0 8px #4ec9b0' : 'none',
        }}
      >
        {icon}
      </span>

      {/* Title */}
      <h3 className="text-xl font-bold text-center">{title}</h3>

      {/* Description */}
      <p className="mt-3 text-center text-sm opacity-80">{description}</p>
    </div>
  );
}

export default Card;
