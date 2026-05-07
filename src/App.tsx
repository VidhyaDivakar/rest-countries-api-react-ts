import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import { CountryDetailsPage } from './pages/CountryDetailsPage'
function App() {
  return (


<BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/country/:name' element={<CountryDetailsPage />}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
