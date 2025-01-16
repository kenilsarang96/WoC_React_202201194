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
      {/* Header */}
      <header
        className={`flex items-center justify-between px-6 py-4 bg-gray-900 shadow-lg border-b border-cyan-500/20 ${className}`}
      >
        {/* Logo and Brand Name */}
        <div className="flex items-center">
          <Logo className="h-10 w-10 mr-2" />
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            CodeCatalyst
          </span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-4">
          {location.pathname !== "/ide" && (
            <>
              {location.pathname === "/guest" && (
                <Button
                  onClick={() => navigate("/signup")}
                  className="hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all"
                >
                  Sign up
                </Button>
              )}
              {location.pathname === "/" && (
                <Button
                  onClick={() => navigate("/guest")}
                  className="hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all"
                >
                  Try for free
                </Button>
              )}
              <Button
                onClick={() => navigate("/login")}
                className="hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all"
              >
                Login
              </Button>
            </>
          )}
          {location.pathname === "/ide" && (
            <Button
              onClick={() => setShowLogoutModal(true)}
              className="hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all"
            >
              Logout
            </Button>
          )}
        </div>
      </header>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-cyan-500/20">
            <h2 className="text-xl font-bold text-white mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-end space-x-4">
              <Button
                onClick={() => setShowLogoutModal(false)}
                variant="outline"
                className="hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all"
              >
                No
              </Button>
              <Button
                onClick={() => {
                  setShowLogoutModal(false);
                  logoutHandler();
                }}
                variant="danger"
                className="hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all"
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