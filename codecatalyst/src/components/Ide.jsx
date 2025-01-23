import React, { useState } from "react";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { lineNumbers } from "@codemirror/view";
import { EditorView } from "@codemirror/view";
import { autocompletion } from "@codemirror/autocomplete";
import { useSelector, useDispatch } from "react-redux";
import { useLanguageData } from "../hooks/useLanguageData";
import { LANGUAGE_DATA } from "../utils/LANGUAGE_DATA";
import { THEMES, getTheme } from "../utils/themesUtils";
import { handleDownload } from "../utils/downloadUtils";
import { updateFileCode } from "../store/fileSlice";
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
import Terminal from "./Terminal";
import AiChat from "./AiChat";
import Filebar from "./Filebar";

const themeColor = "#000000"; 

function Ide() {
  const [theme, setTheme] = useState("oneDark");
  const [isWrappingEnabled, setIsWrappingEnabled] = useState(false);
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  const [isFileBarVisible, setIsFileBarVisible] = useState(false);
  const [fileBarWidth, setFileBarWidth] = useState(300);
  const [fontSize, setFontSize] = useState(() => {
    const savedFontSize = localStorage.getItem("editorFontSize");
    return savedFontSize ? parseInt(savedFontSize, 10) : 14;
  });
  const [shouldExecuteCode, setShouldExecuteCode] = useState(false);

  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.AuthStaus);
  const selectedFileId = useSelector((state) => state.file.selectedFileId);
  const files = useSelector((state) => state.file.files);
  const selectedFile = files.find((file) => file.id === selectedFileId);

  const { language, code, setCode, selectedLanguageData, handleLanguageChange } = useLanguageData();

  const onResize = (event, { size }) => {
    setFileBarWidth(size.width);
  };

  const getLanguageExtension = () => {
    switch (language) {
      case "javascript":
        return javascript();
      case "python":
        return python();
      default:
        return javascript();
    }
  };

  const handleEditorChange = (value) => {
    setCode(value);
    if (authStatus && selectedFileId) {
      dispatch(updateFileCode({ id: selectedFileId, code: value }));
    }
  };

  const handleDownloadClick = () => {
    if (authStatus && selectedFile) {
      handleDownload(code, language, selectedFile.name);
    } else {
      handleDownload(code, language);
    }
  };

  const updateFontSize = (newSize) => {
    setFontSize(newSize);
    localStorage.setItem("editorFontSize", newSize.toString());
  };

  const handleRunCode = () => {
    if (!isTerminalVisible) {
      setIsTerminalVisible(true);
    }
    setShouldExecuteCode(true);
  };

  return (
    <div className="flex flex-col h-screen">
    
      <AppBar position="static" sx={{ bgcolor: themeColor }}>
        <Toolbar>
       
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
                    sx={{ bgcolor: "rgba(255, 255, 255, 0.2)", color: "white" }}
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
                sx={{ bgcolor: "rgba(255, 255, 255, 0.2)", color: "white" }}
              >
                {Object.keys(THEMES).map((themeName) => (
                  <MenuItem key={themeName} value={themeName}>
                    {themeName}
                  </MenuItem>
                ))}
              </Select>
            </Tooltip>
          </Box>

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
                sx={{ color: "#FFD700" }}
              >
                <TerminalIcon />
              </IconButton>
            </Tooltip>
          </Box>

     
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
              sx={{ width: 100, color: "white" }}
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
                      color: isWrappingEnabled ? "#4CAF50" : "#f44336", 
                    },
                    "& .MuiSwitch-track": {
                      backgroundColor: isWrappingEnabled ? "#4CAF50" : "#f44336",
                    },
                  }}
                />
                <Typography sx={{ color: "white" }}>Wrap</Typography>
              </Box>
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

  
      <div className="flex flex-1">
        {authStatus && isFileBarVisible && (
          <Resizable
            width={fileBarWidth}
            height={Infinity}
            onResize={onResize}
            minConstraints={[200, Infinity]}
            maxConstraints={[400, Infinity]}
            axis="x"
            resizeHandles={["e"]}
          >
            <div style={{ width: fileBarWidth }} className="bg-gray-800 text-white p-4">
              <Filebar onClose={() => setIsFileBarVisible(false)} />
            </div>
          </Resizable>
        )}
        <div
          style={{
            width: `calc(100% - ${authStatus && isFileBarVisible ? fileBarWidth : 0}px)`,
          }}
          className="h-full overflow-hidden"
        >
          <div className="h-full overflow-auto bg-gray-900">
            <CodeMirror
              value={code}
              extensions={[
                getLanguageExtension(),
                lineNumbers(),
                autocompletion(),
                isWrappingEnabled ? EditorView.lineWrapping : [],
              ]}
              theme={getTheme(theme)}
              height="100vh"
              width="100%"
              onChange={handleEditorChange}
              basicSetup={{
                lineWrapping: isWrappingEnabled,
              }}
              style={{ fontSize: `${fontSize}px` }}
            />
          </div>
        </div>
      </div>
      {isTerminalVisible && (
        <Terminal
          onClose={() => setIsTerminalVisible((prev) => !prev)}
          code={code}
          language={language}
          version={selectedLanguageData.version}
          shouldExecuteCode={shouldExecuteCode}
          setShouldExecuteCode={setShouldExecuteCode}
        />
      )}
      <AiChat />
    </div>
  );
}

export default Ide;