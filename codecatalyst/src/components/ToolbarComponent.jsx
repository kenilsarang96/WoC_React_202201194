import React, { memo, useCallback, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Select,
  Button,
  Box,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Terminal as TerminalIcon,
  Download as DownloadIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { LANGUAGE_DATA } from "../utils/LANGUAGE_DATA";
import { useTheme } from "../hooks/useTheme";
import SettingsPopup from "./SettingsPopup";
import { useSelector } from "react-redux";

const ToolbarComponent = ({
  authStatus,
  theme,
  setTheme,
  isWrappingEnabled,
  setIsWrappingEnabled,
  setIsTerminalVisible,
  setIsFileBarVisible,
  fontSize,
  updateFontSize,
  handleRunCode,
  handleDownloadClick,
  selectedLanguageData,
  language,
  handleLanguageChange,
  THEMES = {}, // Default empty object if undefined
}) => {
  const { GlobalTheme } = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);
  // const [isRunning, setIsRunning] = useState(false);
  const isExecuting = useSelector((state) => state.execution.isExecuting);

  const themeColors = {
    dark: {
      appBar: "#1E1E1E",
      text: "#FFFFFF",
      selectBackground: "rgba(255, 255, 255, 0.1)",
      slider: "#FFFFFF",
      switchThumb: isWrappingEnabled ? "#4CAF50" : "#F44336",
      switchTrack: isWrappingEnabled ? "#4CAF50" : "#F44336",
    },
    light: {
      appBar: "#FFFFFF",
      text: "#000000",
      selectBackground: "rgba(0, 0, 0, 0.1)",
      slider: "#000000",
      switchThumb: isWrappingEnabled ? "#4CAF50" : "#F44336",
      switchTrack: isWrappingEnabled ? "#4CAF50" : "#F44336",
    },
  };

  const currentTheme = themeColors[GlobalTheme];

  const handleFileBarToggle = useCallback(() => {
    setIsFileBarVisible((prev) => !prev);
  }, [setIsFileBarVisible]);

  const handleTerminalToggle = useCallback(() => {
    setIsTerminalVisible((prev) => !prev);
  }, [setIsTerminalVisible]);

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };



  return (
    <>
      <AppBar
        position="static"
        sx={{ bgcolor: currentTheme.appBar, color: currentTheme.text }}
      >
        <Toolbar>
          {/* Left Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {authStatus && (
              <Tooltip title="Toggle File Bar">
                <IconButton
                  onClick={handleFileBarToggle}
                  color="inherit"
                  edge="start"
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            )}
            {!authStatus && (
              <>
                {selectedLanguageData && (
                  <img
                    src={selectedLanguageData.icon}
                    alt={`${selectedLanguageData.language} logo`}
                    className="w-6 h-6"
                  />
                )}
                <Tooltip title="Select Language">
                  <Select
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    sx={{
                      bgcolor: currentTheme.selectBackground,
                      color: currentTheme.text,
                    }}
                  >
                    {LANGUAGE_DATA.map((lang) => (
                      <MenuItem key={lang.language} value={lang.language}>
                        {lang.language} ({lang.version})
                      </MenuItem>
                    ))}
                  </Select>
                </Tooltip>
              </>
            )}
            {/* Theme Selection with null check */}
            {THEMES && Object.keys(THEMES).length > 0 && (
              <Tooltip title="Select Theme">
                <Select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  sx={{
                    bgcolor: currentTheme.selectBackground,
                    color: currentTheme.text,
                  }}
                >
                  {Object.keys(THEMES).map((themeName) => (
                    <MenuItem key={themeName} value={themeName}>
                      {themeName}
                    </MenuItem>
                  ))}
                </Select>
              </Tooltip>
            )}
          </Box>

          {/* Center Section */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", gap: 2 }}>
            <Tooltip title="Run Code">
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#4CAF50", // Always the same green color
                  "&:hover": { bgcolor: "#45a049" },
                  minWidth: 120,
                  height: 40,
                  position: "relative",
                  transition: "background-color 0.3s ease",
                  // Disabled state styling
                  "&:disabled": {
                    bgcolor: "#4CAF50", // Keep same green when disabled
                    opacity: 0.8, // Slightly transparent when loading
                  }
                }}
                onClick={handleRunCode}
                disabled={isExecuting}
              >
                {isExecuting ? (
                  <CircularProgress
                    size={24}
                    thickness={4}
                    sx={{
                      color: "white",
                    }}
                  />
                ) : (
                  "Run Code"
                )}
              </Button>
            </Tooltip>
            <Tooltip title="Toggle Terminal">
              <IconButton
                onClick={handleTerminalToggle}
                sx={{ color: "#FFD700" }}
              >
                <TerminalIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Right Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Tooltip title="Settings">
              <IconButton onClick={handleSettingsOpen} color="inherit">
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download Code">
              <IconButton
                onClick={handleDownloadClick}
                sx={{ color: "#2196F3" }}
              >
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <SettingsPopup
        open={settingsOpen}
        onClose={handleSettingsClose}
        isWrappingEnabled={isWrappingEnabled}
        setIsWrappingEnabled={setIsWrappingEnabled}
        fontSize={fontSize}
        updateFontSize={updateFontSize}
        currentTheme={currentTheme}
      />
    </>
  );
};

export default memo(ToolbarComponent);