import React, { useState } from "react";
import { Resizable } from "react-resizable"; 
import "react-resizable/css/styles.css"; 

function Terminal({ onClose }) {
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState("");
  const [inputWidth, setInputWidth] = useState(600);
  const [size, setSize] = useState({ width:"100vw", height: 250 });

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const onResize = (event, { size }) => {
    setInputWidth(size.width); // Update Input section width
  };
  const onTerminalHeightResize = (event, { size }) => {
    setInputWidth(size.width); // Update Input section width
  };
  const onResizeMain = (event, { size }) => {
    setSize(size); // Update the size state when resizing
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white font-mono shadow-lg border-t border-cyan-500/20"
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-700 transition-all z-40"
      >
        <span className="material-icons text-cyan-400 hover:text-cyan-500">
          close
        </span>
      </button>

     <Resizable 
              width={size.width}
              height={size.height}
              onResize={onResizeMain}
              minConstraints={[300, 100]} 
              maxConstraints={[Infinity, 600]} 
              resizeHandles={['n']} 
            >
      <div className="flex"  style={{ width: size.width, height: size.height }}>
  
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
            style={{ width: inputWidth }}
            className="p-4 bg-gray-800 border-r border-cyan-500/20"
          >
            <h2 className="text-lg font-bold mb-4 text-cyan-400">Input</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Choose a file:
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-cyan-400 hover:file:bg-gray-600 hover:file:text-white transition-all"
              />
            </div>

            <div className="flex-1 h-full">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Enter input manually:
              </label>
              <textarea
                value={input}
                onChange={handleInputChange}
                className="w-full h-full bg-gray-700 p-2 rounded-md text-white outline-none resize-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                placeholder="Type input here..."
              />
            </div>
          </div>
        </Resizable>

        {/* Output Section */}
        <div
          style={{
            width: `calc(100% - ${inputWidth}px)`,
          }}
          className="p-4 bg-gray-800 overflow-y-auto"
        >
          <h2 className="text-lg font-bold mb-4 text-cyan-400">Output</h2>
          <pre className="whitespace-pre-wrap text-gray-300 bg-gray-700 p-4 rounded-md">
            {output || "Output will appear here..."}
          </pre>
        </div>

      </div>

    </Resizable>
    </div>
  );
}

export default Terminal;