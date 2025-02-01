import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, authRequired = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.AuthStatus);

  useEffect(() => {
    console.log("Your Auth Status is", authStatus);
    if (!authStatus && authRequired) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authRequired]);

  return loader ? (
    <p className="text-lg font-semibold">Loading...</p>
  ) : (
    <>{children}</>
  );
}

export default AuthLayout;