
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./component/Footer/Footer"; 
import Header from "./component/header/Header"; 

function App() {
  return (
    <div>
      <Header /> 
      <main className="flex-grow p-4">
        <Outlet /> 
      </main>
      <Footer /> 
    </div>
    
  );
}

export default App;
