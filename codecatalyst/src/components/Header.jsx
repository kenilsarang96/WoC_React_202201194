import React, { useState, useCallback, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import authService from "../firebase/auth";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Modal,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Logo from "./Logo";
import { useTheme } from "../hooks/useTheme";
import { red } from "@mui/material/colors";

const Header = ({ className = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { GlobalTheme, toggleTheme } = useTheme();
  const authStatus = useSelector((state) => state.auth.AuthStatus);
  const userImgUrl = useSelector((state) => state.auth.userImgUrl);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const logoutHandler = useCallback(() => {
    authService
      .logoutHandler()
      .then(() => {
        dispatch(logout());
        navigate("/");
      })
      .catch((error) => console.error(error));
  }, [dispatch, navigate]);

  const vsCodeDarkTheme = {
    background: "#1E1E1E", // Dark background
    text: "#FFFFFF", // White text
    border: "#333333", // Dark border
    buttonBackground: "#333333", // Dark button background
    buttonHover: "#3C3C3C", // Darker button hover
    modalBackground: "#252526", // Dark modal background
    modalBorder: "#333333", // Dark modal border
    errorButton: "#F44336", // Red error button
  };

  const currentTheme =
    GlobalTheme === "dark"
      ? vsCodeDarkTheme
      : {
          background: "#FFFFFF", // Light background
          text: "#000000", // Black text
          border: "#E5E7EB", // Light border
          buttonBackground: "#E5E7EB", // Light button background
          buttonHover: "#D1D5DB", // Lighter button hover
          modalBackground: "#FFFFFF", // Light modal background
          modalBorder: "#E5E7EB", // Light modal border
          errorButton: "#F44336", // Red error button
        };

  return (
    <>
      <AppBar
        position="static"
        className={`shadow-md backdrop-blur-lg ${className}`}
        sx={{
          background:
            GlobalTheme === "dark"
              ? "linear-gradient(135deg, rgba(30,30,30,0.85), rgba(50,50,50,0.85))"
              : "linear-gradient(135deg, rgba(240,240,240,0.9), rgba(255,255,255,0.9))",
          color: currentTheme.text,
          borderBottom: `1px solid ${currentTheme.border}`,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)", // For Safari
        }}
      >
        <Toolbar className="flex justify-between">
          {/* Logo & Title */}
          <div className="flex items-center">
            <Logo className="h-10 w-10 mr-2" />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: currentTheme.text }}
            >
              CodeCatalyst
            </Typography>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4">
            {authStatus ? (
              <>
                {/* Profile Button */}
                <IconButton onClick={handleProfileClick}>
                  <Avatar
                    src={
                      userImgUrl == null
                        ? "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                        : userImgUrl
                    } // Use userImgUrl from authSlice
                    alt=""
                    sx={{ width: 40, height: 40 }}
                  />
                </IconButton>

                {/* Profile Dropdown Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  sx={{
                    "& .MuiPaper-root": {
                      // Target the Paper component inside Menu
                      backgroundColor: "transparent", // Remove white background
                      boxShadow: "none", // Remove default shadow
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setShowLogoutModal(true);
                    }}
                    sx={{
                      backgroundColor: "red", // Red background
                      color: "white", // White text
                      borderRadius: "4px", // Rounded corners
                      padding: "8px 16px", // Padding for button-like appearance
                      margin: "4px", // Margin for spacing
                      textAlign: "center", // Center text
                      "&:hover": {
                        backgroundColor: "darkred", // Darker red on hover
                      },
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                {location.pathname !== "/ide" && (
                  <>
                    {location.pathname === "/guest" && (
                      <Button
                        variant="contained"
                        onClick={() => navigate("/signup")}
                        sx={{
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          color: currentTheme.text,
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.3)",
                          },
                        }}
                      >
                        Sign up
                      </Button>
                    )}
                    {location.pathname === "/" && (
                      <Button
                        variant="contained"
                        onClick={() => navigate("/guest")}
                        sx={{
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          color: currentTheme.text,
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.3)",
                          },
                        }}
                      >
                        Try for free
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      onClick={() => navigate("/login")}
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        color: currentTheme.text,
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.3)",
                        },
                      }}
                    >
                      Login
                    </Button>
                  </>
                )}
              </>
            )}

            {/* Theme Toggle */}
            <IconButton onClick={toggleTheme} sx={{ color: currentTheme.text }}>
              {GlobalTheme === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* Logout Modal */}
      <Modal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        aria-labelledby="logout-modal-title"
        aria-describedby="logout-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: currentTheme.modalBackground,
            color: currentTheme.text,
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            border: `1px solid ${currentTheme.modalBorder}`,
          }}
        >
          <Typography id="logout-modal-title" variant="h6" component="h2">
            Are you sure you want to logout?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              onClick={() => setShowLogoutModal(false)}
              variant="outlined"
              sx={{ mr: 2, color: currentTheme.text }}
            >
              No
            </Button>
            <Button
              onClick={() => {
                setShowLogoutModal(false);
                logoutHandler();
              }}
              variant="contained"
              sx={{
                backgroundColor: currentTheme.errorButton,
                "&:hover": { backgroundColor: "#D32F2F" },
              }}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default memo(Header);
