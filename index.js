import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import SenderForm from "./SenderForm";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/sender" element={<SenderForm />} />
            </Routes>
        </Router>
    </React.StrictMode>
);








