import React, { useState, useEffect } from "react";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import useCodeExecution from "../hooks/useCodeExecution";
import { useTheme } from "../hooks/useTheme";

function Terminal({
  onClose,
  code,
  language,
  version,
  shouldExecuteCode,
  setShouldExecuteCode,
}) {
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [inputWidth, setInputWidth] = useState(600);
  const [size, setSize] = useState({ width: window.innerWidth, height: 250 });
  const { GlobalTheme } = useTheme(); 

  const { output, isLoading, error, executeCode } = useCodeExecution();

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setInput(e.target.result);
      };
      reader.readAsText(selectedFile);
    }
  };

  const onResize = (event, { size }) => {
    setInputWidth(size.width);
  };

  const onResizeMain = (event, { size }) => {
    setSize(size);
  };

  useEffect(() => {
    if (shouldExecuteCode) {
      executeCode(language, version, code, input);
      setShouldExecuteCode(false);
    }
  }, [shouldExecuteCode]);

  // Theme-based colors
  const themeColors = {
    dark: {
      background: "#1E1E1E", // VS Code dark background
      text: "#D4D4D4", // Light gray text
      border: "#333333", // Dark border
      inputBackground: "#252526", // Dark input background
      outputBackground: "#1E1E1E", // Dark output background
      buttonHover: "#2D2D2D", // Dark button hover
      cyanText: "#4EC9B0", // VS Code cyan text
      errorText: "#FF5555", // Red for errors
    },
    light: {
      background: "#FFFFFF", // Light background
      text: "#1F2937", // Dark text
      border: "#E5E7EB", // Light border
      inputBackground: "#F3F4F6", // Light input background
      outputBackground: "#FFFFFF", // Light output background
      buttonHover: "#E5E7EB", // Light button hover
      cyanText: "#00ACC1", // Cyan text
      errorText: "#FF0000", // Red for errors
    },
  };

  const currentTheme = themeColors[GlobalTheme]; // Use GlobalTheme from Redux

  return (
    <div
      className="fixed bottom-0 left-0 right-0 font-mono shadow-lg border-t"
      style={{
        backgroundColor: currentTheme.background,
        color: currentTheme.text,
        borderColor: currentTheme.border,
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-opacity-50 transition-all z-40"
        style={{ backgroundColor: currentTheme.buttonHover }}
      >
        <span
          className="material-icons"
          style={{ color: currentTheme.cyanText }}
        >
          close
        </span>
      </button>

      {/* Resizable Terminal */}
      <Resizable
        width={size.width}
        height={size.height}
        onResize={onResizeMain}
        minConstraints={[300, 100]}
        maxConstraints={[Infinity, 600]}
        resizeHandles={["n"]}
      >
        <div className="flex" style={{ width: size.width, height: size.height }}>
          {/* Input Section */}
          <Resizable
            width={inputWidth}
            height={Infinity}
            onResize={onResize}
            minConstraints={[200, Infinity]}
            maxConstraints={[800, Infinity]}
            axis="x"
            resizeHandles={["e"]}
          >
            <div
              className="p-4 border-r"
              style={{
                width: inputWidth,
                backgroundColor: currentTheme.inputBackground,
                borderColor: currentTheme.border,
              }}
            >
              <h2
                className="text-lg font-bold mb-4"
                style={{ color: currentTheme.cyanText }}
              >
                Input
              </h2>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: currentTheme.text }}
                >
                  Choose a file:
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold transition-all"
                  style={{
                    color: currentTheme.text,
                    backgroundColor: currentTheme.inputBackground,
                  }}
                />
              </div>
              <div className="flex-1 h-full">
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: currentTheme.text }}
                >
                  Enter input manually:
                </label>
                <textarea
                  value={input}
                  onChange={handleInputChange}
                  className="w-full h-full p-2 rounded-md outline-none resize-none transition-all"
                  style={{
                    backgroundColor: currentTheme.inputBackground,
                    color: currentTheme.text,
                    borderColor: currentTheme.border,
                  }}
                  placeholder="Type input here..."
                />
              </div>
            </div>
          </Resizable>

          {/* Output Section */}
          <div
            style={{ width: `calc(100% - ${inputWidth}px)`, backgroundColor: currentTheme.outputBackground }}
            className="p-4 overflow-y-auto"
          >
            <h2
              className="text-lg font-bold mb-4"
              style={{ color: currentTheme.cyanText }}
            >
              Output
            </h2>
            {isLoading ? (
              <p style={{ color: currentTheme.text }}>Executing code...</p>
            ) : error ? (
              <p style={{ color: currentTheme.errorText }}>{error}</p>
            ) : (
              <pre
                className="whitespace-pre-wrap p-4 rounded-md"
                style={{
                  backgroundColor: currentTheme.inputBackground,
                  color: currentTheme.text,
                }}
              >
                {output || "Output will appear here..."}
              </pre>
            )}
          </div>
        </div>
      </Resizable>
    </div>
  );
}

export default Terminal;