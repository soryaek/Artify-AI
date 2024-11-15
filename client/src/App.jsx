import React from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import { logo } from "./assets";
import { Home, CreatePost } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  const location = useLocation();
  const buttonText = location.pathname === '/create-image' ? 'Collection' : 'Create';
  const buttonRoute = location.pathname === '/create-image' ? '/' : '/create-image';

  return (
    <div className="text-3xl font-bold mx-8">
      {/* <BrowserRouter> */}
        <header className="sticky top-0 w-full flex justify-between items-center sm:px-8 py-2 border-b border-b-[#e6eff4] bg-white z-10">
          <Link to="/">
            <div className="flex items-center justify-center">
              <img src={logo} alt="logo" className="object-container w-14" />
              <span className="text-2xl ml-4">Artify AI</span>
            </div>
          </Link>
          <Link to={buttonRoute} className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md text-lg">
            {buttonText}
          </Link>
        </header>
        <main className="sm:p-8 px-4 py-8 w-full max-w-4xl mx-auto flex flex-col items-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-image" element={<CreatePost />} />
          </Routes>
        </main>
      {/* </BrowserRouter> */}
      <ToastContainer /> 
    </div>
  )
}
export default App;
