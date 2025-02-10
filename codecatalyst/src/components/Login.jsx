import React, { useState } from 'react';
import Logo from './Logo';
import authService from '../firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signinHandler = async (email, password) => {
    try {
      const user = await authService.signinHandler(email, password);
      dispatch(login(user.uid));
      navigate('/ide');
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          setErrorMessage('Invalid email address. Please check your email and try again.');
          break;
        case 'auth/user-not-found':
          setErrorMessage('No account found with this email. Please sign up first.');
          break;
        case 'auth/wrong-password':
          setErrorMessage('Incorrect password. Please try again.');
          break;
        case 'auth/too-many-requests':
          setErrorMessage('Too many failed attempts. Please try again later.');
          break;
        case 'auth/user-disabled':
          setErrorMessage('Your account has been disabled. Please contact support.');
          break;
        default:
          setErrorMessage('An error occurred. Please try again.');
          break;
      }
      console.error('Error signing in:', error);
    }
  };

  const SignUpWithGoogle = () => {
    authService
      .SignUpWithGoogle()
      .then((user) => {
        dispatch(login(user.uid))
        navigate('/ide');
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-cyan-500/20">
        {/* Logo and Brand Name */}
        <div className="flex justify-center">
          <Logo className="h-10 w-10 mr-2" />
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            CodeCatalyst
          </span>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center mt-3 text-white">Login</h2>

  
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-800/20 border border-red-500/50 text-red-400 rounded-md">
            {errorMessage}
          </div>
        )}


        <form onSubmit={(e) => { e.preventDefault(); signinHandler(email, password); }}>
 
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
            Login
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
          Login with Google
        </Button>

    
        <div className="mt-6 text-center">
          <span className="text-gray-400">Don't have an account? </span>
          <Button
            onClick={() => navigate('/signup')}
            variant="text"
            className="text-cyan-400 hover:text-cyan-300 focus:underline"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;