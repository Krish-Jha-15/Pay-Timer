import React from "react";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900 text-white px-4">
      <div className="bg-slate-800 p-8 rounded-xl shadow-2xl text-center max-w-md">
        <h1 className="text-3xl font-bold text-cyan-400 mb-4">
          Access Restricted
        </h1>
        <p className="text-lg text-slate-300">
          To access this page, please log in first.
        </p>
      </div>
    </div>
  );
}

export default Home;
