import React from "react";
import Logo from "./Logo";
import Button from "./Button";

function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-800 shadow-lg">

      <div className="flex items-center">
        <Logo className="h-10 w-10 mr-2"/>
        <span className="text-2xl font-bold text-white">CodeCatalyst</span>
      </div>

      <div className="flex items-center space-x-4">
        <Button>Explore</Button>
        <Button>Login</Button>
      </div>
      
    </header>
  );
}

export default Header;
