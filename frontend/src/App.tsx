import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Auth from "./pages/auth";
import { Landing } from "./pages/landing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
