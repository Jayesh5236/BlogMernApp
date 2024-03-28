import { Routes, Route } from "react-router-dom";

import Homepage from "./Pages/Homepage";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import Projects from "./Pages/Projects";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Header from "./Components/Header";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </>
  );
}

export default App;
