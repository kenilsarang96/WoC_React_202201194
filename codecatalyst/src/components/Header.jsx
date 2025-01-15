import React, { useState } from "react";
import Logo from "./Logo";
import Button from "./Button";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import authService from "../firebase/auth";

function Header({ className = "" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showLogoutModal, setShowLogoutModal] = useState(false); 

  const logoutHandler = () => {
    authService
      .logoutHandler()
      .then(() => {
        dispatch(logout());
        navigate("/"); 
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <header className={`flex items-center justify-between px-6 py-4 bg-gray-800 shadow-lg ${className}`}>
   
        <div className="flex items-center">
          <Logo className="h-10 w-10 mr-2" />
          <span className="text-2xl font-bold text-white">CodeCatalyst</span>
        </div>

  
        <div className="flex items-center space-x-4">
          {location.pathname !== "/ide" && (
            <>
              {location.pathname === "/guest" && (
                <Button onClick={() => navigate("/signup")}>Sign up</Button>
              )}
              {location.pathname === "/" && (
                <Button onClick={() => navigate("/guest")}>Try for free</Button>
              )}
              <Button onClick={() => navigate("/login")}>Login</Button>
            </>
          )}
          {location.pathname === "/ide" && (
            <Button onClick={() => setShowLogoutModal(true)}>Logout</Button>
          )}
        </div>
      </header>

      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to logout?</h2>
            <div className="flex justify-end space-x-4">
              <Button
                onClick={() => setShowLogoutModal(false)}
                variant="outline"
              >
                No
              </Button>
              <Button
                onClick={() => {
                  setShowLogoutModal(false); 
                  logoutHandler(); 
                }}
                variant="danger"
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;