import { useState, useEffect } from "react";
import { LANGUAGE_DATA } from "../utils/LANGUAGE_DATA";
import { useSelector } from "react-redux";

export const useLanguageData = () => {
  const authStatus = useSelector((state) => state.auth.AuthStaus);
  const selectedFile = useSelector((state) => {
    const selectedFileId = state.file.selectedFileId;
    return state.file.files.find((file) => file.id === selectedFileId);
  });

  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");

  // For non-logged-in users, use local storage
  useEffect(() => {
    if (!authStatus) {
      const savedLanguage = localStorage.getItem("language");
      const savedCode = localStorage.getItem("code");
      if (savedLanguage) setLanguage(savedLanguage);
      if (savedCode) setCode(savedCode);
    }
  }, [authStatus]);

  // For logged-in users, sync with the selected file
  useEffect(() => {
    if (authStatus && selectedFile) {
      setLanguage(selectedFile.language);
      setCode(selectedFile.code);
    }
  }, [authStatus, selectedFile]);

  const selectedLanguageData = LANGUAGE_DATA.find((lang) => lang.language === language);

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    const selectedLangData = LANGUAGE_DATA.find((lang) => lang.language === selectedLanguage);
    if (selectedLangData) {
      setCode(selectedLangData.codeSnippet);
    }

    // Save to local storage only for non-logged-in users
    if (!authStatus) {
      localStorage.setItem("language", selectedLanguage);
      localStorage.setItem("code", selectedLangData.codeSnippet);
    }
  };

  return {
    language,
    code,
    setCode,
    selectedLanguageData,
    handleLanguageChange,
  };
};