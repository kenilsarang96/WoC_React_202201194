import React, { useState } from "react";
import Logo from "./Logo";
import authService from "../firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import Button from "./Button"; // Import the Button component

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signupHandler = (name, email, password) => {
    authService
      .signupHandler(email, password)
      .then((user) => {
        dispatch(login({ email, name }));
      })
      .catch((error) => console.error(error));
  };

  const SignUpWithGoogle = () => {
    authService
      .SignUpWithGoogle()
      .then((user) => {
        dispatch(login({ email: user.email, name: user.displayName }));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md items-center justify-center">
        <div className="flex justify-center">
          <Logo className="h-10 w-10 mr-2" />
          <span className="text-2xl font-bold text-blue-800">CodeCatalyst</span>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center mt-3">Sign up</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            signupHandler(name, email, password);
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="medium"
            className="w-full"
          >
            Sign Up
          </Button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <div className="w-full border-t border-gray-300"></div>
          <span className="px-2 text-gray-500">or</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>

        <Button
          onClick={SignUpWithGoogle}
          variant="outline"
          size="medium"
          className="w-full mt-6 flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50 text-gray-700"
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
          <span className="text-gray-600">Already have an Account? </span>
          <Button
            onClick={() => navigate("/login")}
            variant="text"
            className="text-indigo-600 hover:text-indigo-500 focus:underline"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
