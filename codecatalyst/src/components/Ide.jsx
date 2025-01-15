import React, { useState,useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { basicLight, basicLightInit, basicDark, basicDarkInit } from '@uiw/codemirror-theme-basic';
import { lineNumbers } from "@codemirror/view";
import { autocompletion } from "@codemirror/autocomplete";
import Button from "./Button"; 
import Terminal from "./Terminal";
import AiChat from "./AiChat";

function Ide() {
  const [code, setCode] = useState("console.log('Hello, world!');");
  const [language, setLanguage] = useState("javascript"); 
  const [theme, setTheme] = useState("oneDark"); 
  const [isWrappingEnabled, setIsWrappingEnabled] = useState(false); 
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);


  const onChange = useCallback((value) => {
    setCode(value);
  }, []);

  const getLanguageExtension = () => {
    switch (language) {
      case "javascript":
        return javascript();
      case "python":
        return python();
      case "html":
        return html();
      case "css":
        return css();
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

  return (
    <div className="flex flex-col h-screen">
      
  
      <div className="flex items-center justify-between p-4 bg-gray-800 text-white">

        <Button
          onClick={() => setIsTerminalVisible((prev)=>!prev)}
          className="p-2 !border-0 hover:bg-gray-700" 
        >
          <span className="material-icons">terminal</span>
        </Button>

        <select
          value={language}
          onChange={()=>setLanguage(e.target.value)}
          className="p-2 bg-gray-700 rounded-md"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>

        <select
          value={theme}
          onChange={()=>setTheme(e.target.value)}
          className="p-2 bg-gray-700 rounded-md"
        >
          <option value="oneDark">One Dark</option>
          <option value="basicLight">basic Light</option>
        </select>

        <Button onClick={() => console.log("Running code:", code)}>
          Run Code
        </Button>

        <Button onClick={() => setIsWrappingEnabled((prev)=>!prev)}>
          {isWrappingEnabled ? "Disable Wrapping" : "Enable Wrapping"}
        </Button>
      </div>

      <CodeMirror
        value={code}
        height="calc(100vh - 64px)" 
        width="100%"
        extensions={[getLanguageExtension(), lineNumbers(), autocompletion()]}
        theme={getTheme()}
        onChange={onChange}
        basicSetup={{
          lineWrapping: isWrappingEnabled, 
        }}
      />
      {isTerminalVisible && <Terminal onClose={()=>setIsTerminalVisible((prev)=>!prev)} />}
        <AiChat></AiChat>
    </div>
  );
}

export default Ide;