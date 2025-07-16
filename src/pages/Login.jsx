import React, { useState } from 'react';
import colfLogo from "../assets/logo.gif";
import backgroundImg from "../assets/doller.jpg";
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.email === 'admin@gmail.com') {
          navigate("/dashboard", { replace: true });
        } else {
          setError('Not permitted to login');
        }
      })
      .catch((error) => {
        const errorCode = error.code;

        // Custom messages based on error code
        let friendlyMessage = '';

        switch (errorCode) {
          case 'auth/invalid-credential':
          case 'auth/wrong-password':
          case 'auth/user-not-found':
            friendlyMessage = 'Invalid password';
            break;
          case 'auth/too-many-requests':
            friendlyMessage = 'Too many failed attempts. Try again later.';
            break;
          case 'auth/network-request-failed':
            friendlyMessage = 'Network error. Check your internet connection.';
            break;
          default:
            friendlyMessage = 'Login failed. Please try again.';
            break;
        }
        setError(friendlyMessage);
      });
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Overlay */}
       <div className="absolute inset-0 bg-black/40"></div>

      {/* Login Container */}
      <div className="relative z-10 bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8 rounded-3xl shadow-lg w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={colfLogo}
            alt="Logo"
            className="w-24 h-24 object-cover rounded-full border-2 border-green-500"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Welcome Back!
        </h2>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-300 font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 bg-white text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 font-semibold mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 bg-white text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="group relative h-[50px] w-full rounded-md overflow-hidden border border-green-800 bg-green-600 text-white font-semibold transition-all
              before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-black before:duration-500
              after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-black after:duration-500
              hover:text-white hover:before:h-full hover:after:h-full"
          >
            <span
              className="absolute inset-0 z-0 flex items-center justify-center
                before:absolute before:bottom-0 before:left-1/4 before:h-0 before:w-1/4 before:bg-black before:duration-500
                after:absolute after:top-0 after:right-1/4 after:h-0 after:w-1/4 after:bg-black after:duration-500
                group-hover:before:h-full group-hover:after:h-full"
            />
            <span className="relative z-10">Login</span>
          </button>
        </form>
      </div>
    </div>
  );
}
