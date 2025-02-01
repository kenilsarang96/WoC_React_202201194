import { useState, useEffect } from "react";
import { LANGUAGE_DATA } from "../utils/LANGUAGE_DATA";
import { useSelector } from "react-redux";

export const useLanguageData = () => {
  
  const authStatus = useSelector((state) => state.auth.AuthStatus);
  const selectedFile = useSelector((state) => {
    const selectedFileId = state.file.selectedFileId;
    return state.file.files.find((file) => file.id === selectedFileId);
  });


  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");


  useEffect(() => {
    if (!authStatus) {
      const savedLanguage = localStorage.getItem("language");
      const savedCode = localStorage.getItem("code");
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
      if (savedCode) {
        setCode(savedCode);
      }
    }
  }, [authStatus]);
  
  useEffect(() => {
    if (!authStatus) {
      localStorage.setItem("code", code);
    }
  }, [code, authStatus]);
  
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
      console.log("Updated language and code snippet:", {
        language: selectedLanguage,
        code: selectedLangData.codeSnippet,
      });
    }

    
    if (!authStatus) {
      localStorage.setItem("language", selectedLanguage);
      console.log("Saved language to local storage:", selectedLanguage);
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