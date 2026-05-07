import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Nav from "./components/common/Nav";
import Dashboard from "./pages/Dashboard";
import { CountryDetailsPage } from './pages/CountryDetailsPage'
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/country/:name" element={<CountryDetailsPage />}> </Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
