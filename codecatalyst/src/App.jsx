import { useEffect, useState } from "react";
import authService from "./firebase/auth.js";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice.js";
import { ClipLoader } from "react-spinners";
import {ToastContainer} from "react-toastify";

function App() {
  const [loading, setLoading] = useState(true); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      if (user) {
        dispatch(login(user.uid)); 
        navigate("/ide");
      } else {
        dispatch(logout()); 
      }
      setLoading(false); 
    });

    return () => unsubscribe(); 
  }, [dispatch, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <ClipLoader color="#36D7B7" size={50} />
      </div>
    );
  }

 
  return (
    <div className="min-h-screen flex flex-wrap content-between bg-black">
      <div className="w-full block">
        <Outlet />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false} 
        newestOnTop={false}
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss
        draggable 
        pauseOnHover 
      />
    </div>
  );
}

export default App;