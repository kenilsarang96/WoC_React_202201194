import React, { useState } from "react";

function Terminal({onClose}) {
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white font-mono">
      <button
        onClick={onClose} 
        className="absolute top-2 right-2 p-1 bg-none rounded-full"
      > 
        <span className="material-icons text-white">close</span>
      </button>


      <div className="flex h-64">
        <div className="w-1/2 p-4 bg-gray-800 border-r border-gray-700">
          <h2 className="text-lg font-bold mb-4">Input</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Choose a file:
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">
              Enter input manually:
            </label>
            <textarea
              value={input}
              onChange={handleInputChange}
              className="w-full h-full bg-gray-700 p-2 rounded-md outline-none resize-none"
              placeholder="Type input here..."
            />
          </div>
        </div>

        <div className="w-1/2 p-4 bg-gray-800 overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">Output</h2>
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      </div>
    </div>
  );
}

export default Terminal;
