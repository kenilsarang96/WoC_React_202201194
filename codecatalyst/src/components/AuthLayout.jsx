import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, authRequired = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.AuthStaus);

  useEffect(() => {
    console.log("Your Auth Status is", authStatus);
    if (!authStatus && authRequired) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authRequired]);

  return loader ? (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-cyan-500 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  ) : (
    <>{children}</>
  );
}

export default AuthLayout;