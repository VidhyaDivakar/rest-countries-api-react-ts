import { Route, Routes } from 'react-router-dom'
import './App.css'
import { CountryDetailsPage } from './pages/CountryDetailsPage'


function App() {

  return (
    <>
      <h1> Rest Countries API</h1>
      <Routes>
        <Route path='/country/:name' element={<CountryDetailsPage />}> </Route>
      </Routes>
    </>
  )
}

export default App
