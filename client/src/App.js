import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HouseList from "./components/HouseList";
import HouseForm from "./components/HouseForm";
import VoiceSearch from "./components/VoiceSearch";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <VoiceSearch />
      </div>
    </Router>
  );
}

export default App;
