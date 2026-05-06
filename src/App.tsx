import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css'
import Dashboard from './pages/Dashboard'

function App() {
 
  return (
    <>
     <h1> Rest Countries API</h1>
     <BrowserRouter>
        <Routes>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
