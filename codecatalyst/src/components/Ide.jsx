import React, { useState } from "react";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { lineNumbers } from "@codemirror/view";
import { autocompletion } from "@codemirror/autocomplete";
import Button from "./Button";
import Terminal from "./Terminal";
import AiChat from "./AiChat";
import Filebar from "./Filebar";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import { useLanguageData } from "../hooks/useLanguageData";
import { LANGUAGE_DATA } from "../utils/LANGUAGE_DATA";
import { THEMES, getTheme } from "../utils/themesUtils";
import { handleDownload } from "../utils/downloadUtils";
import { updateFileCode } from "../store/fileSlice";

function Ide() {
  const [theme, setTheme] = useState("oneDark");
  const [isWrappingEnabled, setIsWrappingEnabled] = useState(false);
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  const [isFileBarVisible, setIsFileBarVisible] = useState(false);
  const [fileBarWidth, setFileBarWidth] = useState(250);

  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.AuthStaus);
  const selectedFileId = useSelector((state) => state.file.selectedFileId);
  const files = useSelector((state) => state.file.files);
  const selectedFile = files.find((file) => file.id === selectedFileId);

  const {
    language,
    code,
    setCode,
    selectedLanguageData,
    handleLanguageChange,
  } = useLanguageData();

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

  // Handle editor changes
  const handleEditorChange = (value) => {
    setCode(value);
    if (authStatus && selectedFileId) {
      dispatch(updateFileCode({ id: selectedFileId, code: value }));
    }
  };

  // Handle download
  const handleDownloadClick = () => {
    if (authStatus && selectedFile) {
      handleDownload(code, language, selectedFile.name);
    } else {
      handleDownload(code, language);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col h-screen">
        <div className="flex items-center justify-between p-1 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
          <div className="flex items-center gap-2">
            {authStatus && (
              <Button
                onClick={() => setIsFileBarVisible((prev) => !prev)}
                className="p-2 hover:bg-gray-700"
                variant="ghost"
              >
                <span className="material-icons">menu</span>
              </Button>
            )}
          </div>

          <div className="flex items-center gap-4">
            {!authStatus && (
              <>
                {selectedLanguageData && (
                  <img
                    src={selectedLanguageData.icon}
                    alt={`${selectedLanguageData.language} logo`}
                    className="w-6 h-6"
                  />
                )}

                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="p-2 bg-gray-700 text-white rounded-md shadow-md focus:ring focus:ring-cyan-500"
                >
                  {LANGUAGE_DATA.map((lang) => (
                    <option key={lang.language} value={lang.language}>
                      {lang.language} ({lang.version})
                    </option>
                  ))}
                </select>
              </>
            )}

            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="p-2 bg-gray-700 text-white rounded-md shadow-md focus:ring focus:ring-cyan-500"
            >
              {Object.keys(THEMES).map((themeName) => (
                <option key={themeName} value={themeName}>
                  {themeName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => console.log("Running code:", code)}
              variant="primary"
              className="p-2"
            >
              Run Code
            </Button>

            <Button
              onClick={() => setIsWrappingEnabled((prev) => !prev)}
              variant="outline"
              className="p-2"
            >
              {isWrappingEnabled ? "Disable Wrapping" : "Enable Wrapping"}
            </Button>

            <Button
              onClick={() => setIsTerminalVisible((prev) => !prev)}
              variant="ghost"
              className="p-2"
            >
              <span className="material-icons">terminal</span>
            </Button>

            <Button
              onClick={handleDownloadClick}
              variant="ghost"
              className="p-2"
            >
              <span className="material-icons">download</span>
            </Button>
          </div>
        </div>

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
              <div
                style={{ width: fileBarWidth }}
                className="bg-gray-800 text-white p-4"
              >
                <Filebar onClose={() => setIsFileBarVisible(false)} />
              </div>
            </Resizable>
          )}

          <div
            style={{
              width: `calc(100% - ${
                authStatus && isFileBarVisible ? fileBarWidth : 0
              }px)`,
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
                ]}
                theme={getTheme(theme)} // Apply the selected theme
                height="100vh"
                width="100%"
                onChange={handleEditorChange}
                basicSetup={{
                  lineWrapping: isWrappingEnabled,
                }}
              />
            </div>
          </div>
        </div>

        {isTerminalVisible && (
          <Terminal onClose={() => setIsTerminalVisible((prev) => !prev)} />
        )}

        <AiChat />
      </div>
    </>
  );
}

export default Ide;
