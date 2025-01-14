import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="mt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} CodeCatalyst. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
