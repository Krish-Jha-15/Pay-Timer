import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-gradient-to-r from-slate-900 to-blue-800 text-white shadow-md z-50 px-8 flex items-center justify-between">
      <div
        onClick={() => navigate("/")}
        className="text-2xl font-bold tracking-wide hover:text-cyan-400 cursor-pointer transition duration-200"
      >
        💳 PayTimer
      </div>

      <nav className="hidden md:flex space-x-10">
        <a href="#" className="relative text-slate-300 hover:text-white transition duration-200 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-cyan-400 after:transition-all after:duration-300">
          Features
        </a>
        <a href="#" className="relative text-slate-300 hover:text-white transition duration-200 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-cyan-400 after:transition-all after:duration-300">
          Pricing
        </a>
        <a href="#" className="relative text-slate-300 hover:text-white transition duration-200 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-cyan-400 after:transition-all after:duration-300">
          Help
        </a>
      </nav>

      <div className="flex space-x-4">
        {location.pathname === "/" && (
          <>
            <button
              onClick={() => navigate('/login')}
              className="px-5 py-2 rounded-full border border-slate-300 text-slate-300 hover:bg-white hover:text-blue-800 transition duration-200"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-5 py-2 rounded-full bg-cyan-400 text-slate-900 font-semibold hover:bg-cyan-500 transition duration-200"
            >
              Get Started
            </button>
          </>
        )}
 {location.pathname === "/login" && (
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2 rounded-full border hover:cursor-pointer border-slate-300 text-slate-300 hover:bg-white hover:text-blue-800 transition duration-200"
          >
            home
          </button>
        )}
         {location.pathname === "/signup" && (
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2 rounded-full border hover:cursor-pointer border-slate-300 text-slate-300 hover:bg-white hover:text-blue-800 transition duration-200"
          >
            home
          </button>
        )}
        {location.pathname === "/dashboard" && (
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2 rounded-full border hover:cursor-pointer border-slate-300 text-slate-300 hover:bg-white hover:text-blue-800 transition duration-200"
          >
            Log Out
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
