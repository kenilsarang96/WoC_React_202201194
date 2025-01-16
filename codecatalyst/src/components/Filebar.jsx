import React, { useState } from 'react';

function Filebar({ onClose }) {
  const [files, setFiles] = useState([]); // State to store files
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility
  const [newFileName, setNewFileName] = useState(''); // State for new file name input
  const [newFileLanguage, setNewFileLanguage] = useState('javascript'); // State for new file language
  const [editingFileId, setEditingFileId] = useState(null); // State to track which file is being edited
  const [editFileName, setEditFileName] = useState(''); // State for editing file name

  // Function to open the dialog for creating a new file
  const openDialog = () => {
    console.log("Dialog opened"); // Debugging
    setIsDialogOpen(true);
  };

  // Function to close the dialog
  const closeDialog = () => {
    console.log("Dialog closed"); // Debugging
    setIsDialogOpen(false);
    setNewFileName(''); // Reset input fields
    setNewFileLanguage('javascript');
  };

  // Function to add a new file
  const handleAddFile = () => {
    if (newFileName.trim()) {
      const newFile = {
        id: Date.now(), // Unique ID for the file
        name: newFileName.trim(),
        language: newFileLanguage,
      };
      setFiles([...files, newFile]);
      closeDialog(); // Close the dialog after adding the file
    }
  };

  // Function to delete a file
  const handleDeleteFile = (id) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  // Function to start editing a file
  const handleEditFile = (id, name) => {
    setEditingFileId(id);
    setEditFileName(name);
  };

  // Function to save edited file name
  const handleSaveEdit = () => {
    setFiles(
      files.map((file) =>
        file.id === editingFileId ? { ...file, name: editFileName } : file
      )
    );
    setEditingFileId(null); // Stop editing
    setEditFileName(''); // Clear edit input
  };

  return (
    <div className="flex flex-col bg-gray-900 text-white p-4 border-r border-cyan-500/20 h-full">
      {/* Add File Button */}
      <button
        onClick={openDialog}
        className="w-full p-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-md mb-4 flex items-center justify-center hover:from-cyan-600 hover:to-blue-700 hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all"
      >
        <span className="material-icons mr-2">add</span>
        Add File
      </button>

      {/* Dialog Box for Creating a New File */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-900 p-6 rounded-md w-96 border border-cyan-500/20">
            <h2 className="text-lg font-bold mb-4 text-cyan-400">Create New File</h2>
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="File Name"
              className="w-full p-2 bg-gray-800 text-white rounded-md mb-4 outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <select
              value={newFileLanguage}
              onChange={(e) => setNewFileLanguage(e.target.value)}
              className="w-full p-2 bg-gray-800 text-white rounded-md mb-4 outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeDialog}
                className="p-2 bg-gray-700 text-white rounded-md flex items-center hover:bg-gray-600 hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all"
              >
                <span className="material-icons mr-2">cancel</span>
                Cancel
              </button>
              <button
                onClick={handleAddFile}
                className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-md flex items-center hover:from-cyan-600 hover:to-blue-700 hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all"
              >
                <span className="material-icons mr-2">check</span>
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* File List */}
      <div>
        <h2 className="text-lg font-bold mb-4 text-cyan-400">Files</h2>
        <ul>
          {files.map((file) => (
            <li key={file.id} className="mb-2 flex items-center justify-between">
              {editingFileId === file.id ? (
                // Edit Mode
                <input
                  type="text"
                  value={editFileName}
                  onChange={(e) => setEditFileName(e.target.value)}
                  className="p-1 bg-gray-800 text-white rounded-md outline-none focus:ring-2 focus:ring-cyan-500"
                />
              ) : (
                // Display Mode
                <span className="text-gray-200">{file.name} ({file.language})</span>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                {editingFileId === file.id ? (
                  // Save Button (in Edit Mode)
                  <button
                    onClick={handleSaveEdit}
                    className="p-1 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-md flex items-center hover:from-green-600 hover:to-teal-700 hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all"
                  >
                    <span className="material-icons">save</span>
                  </button>
                ) : (
                  // Edit Button (in Display Mode)
                  <button
                    onClick={() => handleEditFile(file.id, file.name)}
                    className="p-1 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-md flex items-center hover:from-yellow-600 hover:to-amber-700 hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all"
                  >
                    <span className="material-icons">edit</span>
                  </button>
                )}
                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteFile(file.id)}
                  className="p-1 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-md flex items-center hover:from-red-600 hover:to-pink-700 hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all"
                >
                  <span className="material-icons">delete</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Filebar;