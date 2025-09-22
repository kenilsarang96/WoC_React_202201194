import { useState, useEffect, useRef } from 'react';
import { LANGUAGE_DATA } from '../utils/LANGUAGE_DATA';
import { useSelector, useDispatch } from 'react-redux';
import { modifyFileCode } from '../store/fileSlice';

export const useLanguageData = () => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.AuthStatus);
  const userId = useSelector((state) => state.auth.userId);
  const selectedFile = useSelector((state) => {
    const selectedFileId = state.file.selectedFileId;
    return state.file.files.find((file) => file.id === selectedFileId);
  });

  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const saveTimeoutRef = useRef(null);
  const [saveStatus, setSaveStatus] = useState('idle'); // idle | debouncing | saving | saved | error
  const [lastSavedAt, setLastSavedAt] = useState(null);

  useEffect(() => {
    if (!authStatus) {
      const savedLanguage = localStorage.getItem('language');
      const savedCode = localStorage.getItem('code');
      if (savedLanguage) setLanguage(savedLanguage);
      if (savedCode) setCode(savedCode);
    }
  }, [authStatus]);

  useEffect(() => {
    if (!authStatus) {
      localStorage.setItem('code', code);
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
    if (selectedLangData) setCode(selectedLangData.codeSnippet);
    if (!authStatus) localStorage.setItem('language', selectedLanguage);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    if (authStatus && selectedFile) {
      localStorage.setItem('code', newCode);

      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      setSaveStatus('debouncing');
      saveTimeoutRef.current = setTimeout(() => {
        try {
          setSaveStatus('saving');
          Promise.resolve(dispatch(modifyFileCode(userId, selectedFile.id, newCode)))
            .then(() => {
              setSaveStatus('saved');
              const ts = Date.now();
              setLastSavedAt(ts);
              // auto reset to idle after 2s
              setTimeout(() => {
                // if no further save started since ts
                setSaveStatus((curr) => (curr === 'saved' ? 'idle' : curr));
              }, 2000);
            })
            .catch((error) => {
              console.error('Failed to save code to Firestore:', error);
              setSaveStatus('error');
            });
        } catch (error) {
          console.error('Failed to save code to Firestore:', error);
          setSaveStatus('error');
        }
      }, 2500);
    }
  };

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);

  return {
    language,
    code,
    setCode: handleCodeChange,
    selectedLanguageData,
    handleLanguageChange,
    saveStatus,
    lastSavedAt,
  };
};
