import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 border-t border-cyan-500/20">
      <div className="mt-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} CodeCatalyst. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;