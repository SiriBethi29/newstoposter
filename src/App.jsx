import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Create from "./pages/Create";
import Saved from "./pages/Saved";

function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </div>
  );
}

export default App;