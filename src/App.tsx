import "./App.css";
import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import { CountryDetailsPage } from './pages/CountryDetailsPage'
function App() {
  return (

    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/country/:name" element={<CountryDetailsPage />}> </Route>
    </Routes>

  );
}

export default App;
