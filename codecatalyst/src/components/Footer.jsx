import React, { memo } from "react";
import { FaGithub } from "react-icons/fa";
import { useTheme } from "../hooks/useTheme"; 

const Footer = () => {
  const { GlobalTheme } = useTheme(); 

  return (
    <footer
      className="py-6 border-t backdrop-blur-lg shadow-md"
      style={{
        background: GlobalTheme === "dark"
          ? "linear-gradient(135deg, rgba(30,30,30,0.85), rgba(50,50,50,0.85))"
          : "linear-gradient(135deg, rgba(240,240,240,0.9), rgba(255,255,255,0.9))",
        color: GlobalTheme === "dark" ? "#d4d4d4" : "#333",
        borderTop: GlobalTheme === "dark" ? "1px solid #333" : "1px solid #ccc",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)", 
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* GitHub Link */}
          <a
            href="https://github.com/kenilsarang96"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 transition-all"
            style={{
              color: GlobalTheme === "dark" ? "#4ec9b0" : "#0073e6",
              textShadow: GlobalTheme === "dark" ? "0 0 8px #4ec9b0" : "none",
            }}
            onMouseEnter={(e) => (e.target.style.color = GlobalTheme === "dark" ? "#6bd8c2" : "#005bb5")}
            onMouseLeave={(e) => (e.target.style.color = GlobalTheme === "dark" ? "#4ec9b0" : "#0073e6")}
          >
            <FaGithub className="w-6 h-6" />
            <span className="text-lg font-semibold">kenilsarang96</span>
          </a>
        </div>

        {/* Copyright Section */}
        <div
          className="mt-6 text-center text-sm"
          style={{
            color: GlobalTheme === "dark" ? "#a9a9a9" : "#666",
            opacity: 0.8,
          }}
        >
          &copy; {new Date().getFullYear()} CodeCatalyst. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
