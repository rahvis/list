import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HouseList from "./components/HouseList";
import HouseForm from "./components/HouseForm";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HouseList />} />
          <Route path="/add" element={<HouseForm />} />
          <Route path="/edit/:id" element={<HouseForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
