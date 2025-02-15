import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Select,
  Slider,
  Typography,
  Switch,
  Button,
  Box,
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Terminal as TerminalIcon,
  Download as DownloadIcon,
  TextIncrease as TextIncreaseIcon,
  TextDecrease as TextDecreaseIcon,
} from "@mui/icons-material";
import { LANGUAGE_DATA } from "../utils/LANGUAGE_DATA";
import { useTheme } from "../hooks/useTheme"; // Custom hook for theme

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
  THEMES,
}) => {
  const { GlobalTheme } = useTheme(); 

  // Theme-based colors
  const themeColors = {
    dark: {
      appBar: "#1E1E1E", // Dark background for AppBar
      text: "#FFFFFF", // White text
      selectBackground: "rgba(255, 255, 255, 0.1)", // Semi-transparent white
      slider: "#FFFFFF", // White slider
      switchThumb: isWrappingEnabled ? "#4CAF50" : "#F44336", // Green or red thumb
      switchTrack: isWrappingEnabled ? "#4CAF50" : "#F44336", // Green or red track
    },
    light: {
      appBar: "#FFFFFF", // White background for AppBar
      text: "#000000", // Black text
      selectBackground: "rgba(0, 0, 0, 0.1)", // Semi-transparent black
      slider: "#000000", // Black slider
      switchThumb: isWrappingEnabled ? "#4CAF50" : "#F44336", // Green or red thumb
      switchTrack: isWrappingEnabled ? "#4CAF50" : "#F44336", // Green or red track
    },
  };

  const currentTheme = themeColors[GlobalTheme];

  return (
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
                onClick={() => setIsFileBarVisible((prev) => !prev)}
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
        </Box>

        {/* Center Section */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", gap: 2 }}>
          <Tooltip title="Run Code">
            <Button
              variant="contained"
              sx={{
                bgcolor: "#4CAF50",
                "&:hover": { bgcolor: "#45a049" },
              }}
              onClick={handleRunCode}
            >
              Run Code
            </Button>
          </Tooltip>
          <Tooltip title="Toggle Terminal">
            <IconButton
              onClick={() => setIsTerminalVisible((prev) => !prev)}
              sx={{ color: "#FFD700" }} // Gold color for terminal icon
            >
              <TerminalIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Right Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Tooltip title="Decrease Font Size">
            <IconButton color="inherit">
              <TextDecreaseIcon />
            </IconButton>
          </Tooltip>
          <Slider
            value={fontSize}
            min={10}
            max={30}
            step={1}
            onChange={(e, newValue) => updateFontSize(newValue)}
            sx={{ width: 100, color: currentTheme.slider }}
          />
          <Tooltip title="Increase Font Size">
            <IconButton color="inherit">
              <TextIncreaseIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Toggle Word Wrap">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Switch
                checked={isWrappingEnabled}
                onChange={() => setIsWrappingEnabled((prev) => !prev)}
                sx={{
                  "& .MuiSwitch-thumb": {
                    color: currentTheme.switchThumb,
                  },
                  "& .MuiSwitch-track": {
                    backgroundColor: currentTheme.switchTrack,
                  },
                }}
              />
              <Typography sx={{ color: currentTheme.text }}>Wrap</Typography>
            </Box>
          </Tooltip>
          <Tooltip title="Download Code">
            <IconButton
              onClick={handleDownloadClick}
              sx={{ color: "#2196F3" }} // Blue color for download icon
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ToolbarComponent;