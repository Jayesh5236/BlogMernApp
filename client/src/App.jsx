import { Routes, Route } from "react-router-dom";

import Homepage from "./Pages/Homepage";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import Projects from "./Pages/Projects";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Header from "./Components/Header";
import FooterComponent from "./Components/FooterComponent";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <FooterComponent />
    </>
  );
}

export default App;
