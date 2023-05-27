import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Entrieslist from "./entrieslist.jsx";
import Map from "./map.jsx";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="*" element={<Map />} />
                <Route path="/entries" element={<Entrieslist />} />
            </Routes>
        </div>
    );
}

export default App;