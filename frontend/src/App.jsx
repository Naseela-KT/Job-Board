import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { NavbarDefault } from "./components/Navbar";
import AddJob from "./pages/AddJob";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Router>
        <Toaster position="top-right" />
        <NavbarDefault />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-job" element={<AddJob />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
