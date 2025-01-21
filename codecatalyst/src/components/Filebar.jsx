import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addFile,
  deleteFile,
  updateFileName,
  selectFile,
} from "../store/fileSlice";
import { LANGUAGE_DATA } from "../utils/LANGUAGE_DATA";

function Filebar() {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.file.files);
  const selectedFileId = useSelector((state) => state.file.selectedFileId);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [newFileLanguage, setNewFileLanguage] = useState("javascript");
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [editingFileId, setEditingFileId] = useState(null);
  const [editFileName, setEditFileName] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); 
  const [fileToDeleteId, setFileToDeleteId] = useState(null);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setNewFileName("");
    setNewFileLanguage("javascript");
  };

  const openRenameDialog = (id, name) => {
    setEditingFileId(id);
    setEditFileName(name);
    setIsRenameDialogOpen(true);
  };

  const closeRenameDialog = () => {
    setIsRenameDialogOpen(false);
    setEditingFileId(null);
    setEditFileName("");
  };

  const getCodeSnippet = (language) => {
    const languageData = LANGUAGE_DATA.find(
      (lang) => lang.language === language
    );
    return languageData ? languageData.codeSnippet : "";
  };

  const handleAddFile = () => {
    if (newFileName.trim()) {
      const newFile = {
        id: Date.now().toString(),
        name: newFileName.trim(),
        language: newFileLanguage,
        code: getCodeSnippet(newFileLanguage),
      };
      dispatch(addFile(newFile));
      closeDialog();
    }
  };

  const handleDeleteFile = (id) => {
    setFileToDeleteId(id);
    setIsDeleteDialogOpen(true); 
  };
  
  const handleSaveEdit = () => {
    if (editFileName.trim()) {
      dispatch(updateFileName({ id: editingFileId, name: editFileName }));
      closeRenameDialog();
    }
  };

  const handleSelectFile = (id) => {
    dispatch(selectFile(id));
  };
  
  const confirmDelete = () => {
    if (fileToDeleteId) {
      dispatch(deleteFile(fileToDeleteId)); 
      setIsDeleteDialogOpen(false); 
      setFileToDeleteId(null); 
    }
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false); 
    setFileToDeleteId(null); 
  };


  const getLanguageIcon = (language) => {
    const languageData = LANGUAGE_DATA.find(
      (lang) => lang.language === language
    );
    return languageData ? languageData.icon : ""; 
  };

  return (
    <div className="flex flex-col bg-gray-900 text-white p-4 border-r border-cyan-500/20 h-full">
      <button
        onClick={openDialog}
        className="w-full p-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-md mb-4 flex items-center justify-center hover:from-cyan-600 hover:to-blue-700 hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all"
      >
        <span className="material-icons mr-2">add</span>
        Add File
      </button>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-900 p-6 rounded-md w-96 border border-cyan-500/20">
            <h2 className="text-lg font-bold mb-4 text-cyan-400">
              Create New File
            </h2>
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
              {LANGUAGE_DATA.map((lang) => (
                <option key={lang.language} value={lang.language}>
                  {lang.language} ({lang.version})
                </option>
              ))}
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

      {isRenameDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-900 p-6 rounded-md w-96 border border-cyan-500/20">
            <h2 className="text-lg font-bold mb-4 text-cyan-400">
              Rename File
            </h2>
            <input
              type="text"
              value={editFileName}
              onChange={(e) => setEditFileName(e.target.value)}
              placeholder="New File Name"
              className="w-full p-2 bg-gray-800 text-white rounded-md mb-4 outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={closeRenameDialog}
                className="p-2 bg-gray-700 text-white rounded-md flex items-center hover:bg-gray-600 hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all"
              >
                <span className="material-icons mr-2">cancel</span>
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-md flex items-center hover:from-cyan-600 hover:to-blue-700 hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all"
              >
                <span className="material-icons mr-2">check</span>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-900 p-6 rounded-md w-96 border border-cyan-500/20">
            <h2 className="text-lg font-bold mb-4 text-cyan-400">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete this file?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={cancelDelete}
                className="p-2 bg-gray-700 text-white rounded-md flex items-center hover:bg-gray-600 hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all"
              >
                <span className="material-icons mr-2">cancel</span>
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="p-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-md flex items-center hover:from-red-600 hover:to-pink-700 hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all"
              >
                <span className="material-icons mr-2">delete</span>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-bold mb-4 text-cyan-400">Files</h2>
        <ul>
          {files.map((file) => (
            <li
              key={file.id}
              className={`mb-2 flex items-center justify-between p-2 rounded-md ${
                selectedFileId === file.id
                  ? "bg-cyan-500/10"
                  : "hover:bg-cyan-500/10"
              }`}
            >
              <button
                onClick={() => handleSelectFile(file.id)}
                className="text-gray-200 hover:text-cyan-400 flex items-center gap-2"
              >
                <img
                  src={getLanguageIcon(file.language)}
                  alt={`${file.language} logo`}
                  className="w-6 h-6"
                />
                {file.name}
              </button>

              {file.id !== 1 && (<div className="flex gap-2">
                <button
                  onClick={() => openRenameDialog(file.id, file.name)}
                  className="p-1 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-md flex items-center hover:from-yellow-600 hover:to-amber-700 hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all"
                >
                  <span className="material-icons">edit</span>
                </button>
                <button
                  onClick={() => handleDeleteFile(file.id)}
                  className="p-1 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-md flex items-center hover:from-red-600 hover:to-pink-700 hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all"
                >
                  <span className="material-icons">delete</span>
                </button>
              </div>)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Filebar;