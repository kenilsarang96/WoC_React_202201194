import { useEffect, useState } from "react";
import authService from "./firebase/auth.js";
import {Outlet,useNavigate} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux";
import {login,logout} from "./store/authSlice.js"

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        dispatch(login({email:user.email}))
        navigate("/ide");
        setLoading(false);
      } else {
        console.log("you are logged out");
        dispatch(logout())
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);


  return  !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Outlet />
      </div>
    </div>
  ) : (<div>loading...</div>)
}

export default App;