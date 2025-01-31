import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import HouseForm from "./components/HouseForm";
import VoiceSearch from "./components/VoiceSearch";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <VoiceSearch />
        <Routes>
          <Route path="/add" element={<HouseForm />} />
          <Route path="/edit/:id" element={<HouseForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
