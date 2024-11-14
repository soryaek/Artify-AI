import React from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import { Home, CreatePost } from "./pages";

const App = () => {
  return (
    // bg-[#0B192C]
    <div className="text-3xl font-bold">
      <BrowserRouter>
        <header className="w-full flex justify-between items-center sm:px-8 py-4 border-b border-b-[#e6eff4]">
          <Link to="/">
            <div className="flex items-center justify-center">
              <img src={logo} alt="logo" className="object-container w-24" />
              <span className="text-2xl ml-4">Artify AI</span>
            </div>
          </Link>
          <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
            Create
          </Link>
        </header>
        {/* bg-[#f9fafe] */}
        {/* min-h=[calc(100vh-73px)]  */}
        <main className="sm:p-8 px-4 py-8 w-full flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}
export default App;
