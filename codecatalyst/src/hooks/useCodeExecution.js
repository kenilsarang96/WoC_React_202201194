import { useState } from "react";
import axios from "axios";

const useCodeExecution = () => {
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeCode = async (language, version, code, input) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("https://winter-of-code-react-js.vercel.app/code/execute-code", {
        language,
        version,
        sourceCode: code,
        codeInput: input,
      });
      const { stdout, stderr } = response.data;
      if (stdout) setOutput(stdout);
      else if (stderr) setOutput(stderr);
      else setOutput("No output received.");
    } catch (e) {
      setError("An error occurred while executing the code.");
      console.error("Error executing code:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return { output, isLoading, error, executeCode };
};

export default useCodeExecution;