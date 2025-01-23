import React from "react";
import { FaGithub } from "react-icons/fa"; 

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 border-t border-cyan-500/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <a
            href="https://github.com/kenilsarang96"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-500 transition-all"
          >
            <FaGithub className="w-6 h-6" />
            <span className="text-lg font-semibold">kenilsarang96</span>
          </a>
         
        </div>
        <div className="mt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} CodeCatalyst. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;