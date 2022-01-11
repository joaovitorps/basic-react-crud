import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Usuarios from "./screens/Usuarios";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Usuarios />} exact />
      <Route path="/:id" element={<Usuarios />} exact />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
