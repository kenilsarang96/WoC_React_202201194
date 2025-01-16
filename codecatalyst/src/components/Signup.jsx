import React, { useState } from "react";
import Logo from "./Logo";
import authService from "../firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signupHandler = async (name, email, password) => {
    try {
      const user = await authService.signupHandler(email, password);
      dispatch(login({ email, name }));
      navigate("/ide");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const SignUpWithGoogle = () => {
    authService
      .SignUpWithGoogle()
      .then((user) => {
        dispatch(login({ email: user.email, name: user.displayName }));
        navigate("/ide");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-cyan-500/20">
  
        <div className="flex justify-center">
          <Logo className="h-10 w-10 mr-2" />
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            CodeCatalyst
          </span>
        </div>

 
        <h2 className="text-2xl font-bold mb-6 text-center mt-3 text-white">Sign Up</h2>


        <form
          onSubmit={(e) => {
            e.preventDefault();
            signupHandler(name, email, password);
          }}
        >

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Name</label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Enter your name"
              required
            />
          </div>

 
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="medium"
            className="w-full hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all"
          >
            Sign Up
          </Button>
        </form>

   
        <div className="mt-6 flex items-center justify-center">
          <div className="w-full border-t border-gray-700"></div>
          <span className="px-2 text-gray-400">or</span>
          <div className="w-full border-t border-gray-700"></div>
        </div>

        <Button
          onClick={SignUpWithGoogle}
          variant="outline"
          size="medium"
          className="w-full mt-6 flex items-center justify-center gap-2 border-gray-700 hover:bg-gray-700/50 text-gray-300 hover:text-white transition-all"
          icon={
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google Logo"
              className="h-5 w-5"
            />
          }
          iconPosition="left"
        >
          Sign up with Google
        </Button>

  
        <div className="mt-6 text-center">
          <span className="text-gray-400">Already have an account? </span>
          <Button
            onClick={() => navigate("/login")}
            variant="text"
            className="text-cyan-400 hover:text-cyan-300 focus:underline"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
