import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { App } from './app'
import { Pets } from './pages/pets/pets'

export const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<App />} />

        <Route path='/pets' element={<Pets />} />

      </Routes>
    </BrowserRouter>
  )
}