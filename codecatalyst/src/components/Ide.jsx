import React, { useState, useCallback } from "react";
import { Resizable } from "react-resizable"; 
import "react-resizable/css/styles.css";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { basicLight } from "@uiw/codemirror-theme-basic";
import { lineNumbers } from "@codemirror/view";
import { autocompletion } from "@codemirror/autocomplete";
import Button from "./Button";
import Terminal from "./Terminal";
import AiChat from "./AiChat";
import Filebar from "./Filebar";
import { useSelector } from "react-redux";
import Header from "./Header";

function Ide() {
  const [code, setCode] = useState("console.log('Hello, world!');");
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("oneDark");
  const [isWrappingEnabled, setIsWrappingEnabled] = useState(false);
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  const [isFileBarVisible, setIsFileBarVisible] = useState(false);
  const [fileBarWidth, setFileBarWidth] = useState(250); 
  const authStatus = useSelector((state) => state.auth.AuthStaus);

  const onChange = useCallback((value) => {
    setCode(value);
  }, []);

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

  const getTheme = () => {
    switch (theme) {
      case "oneDark":
        return oneDark;
      case "basicLight":
        return basicLight;
      default:
        return oneDark;
    }
  };

  const onResize = (event, { size }) => {
    setFileBarWidth(size.width); 
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

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="p-2 bg-gray-700 text-white rounded-md shadow-md focus:ring focus:ring-cyan-500"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
            </select>

            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="p-2 bg-gray-700 text-white rounded-md shadow-md focus:ring focus:ring-cyan-500"
            >
              <option value="oneDark">One Dark</option>
              <option value="basicLight">Basic Light</option>
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
          </div>
        </div>

        <div className="flex flex-1">

          {isFileBarVisible && (
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
              width: `calc(100% - ${isFileBarVisible ? fileBarWidth : 0}px)`,
            }}
            className="h-full overflow-hidden"
          >
            <div className="h-full overflow-auto bg-gray-900">
              <CodeMirror
                value={code}
                extensions={[getLanguageExtension(), lineNumbers(), autocompletion()]}
                theme={getTheme()}
                height="100vh"
                width="100%"
                onChange={onChange}
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