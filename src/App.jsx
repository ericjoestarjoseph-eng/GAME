import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import CatalogPage from './pages/CatalogPage.jsx'
import AddGamePage from './pages/AddGamePage.jsx'
import LoginPage from './pages/LoginPage.jsx'

export default function App() {
  return (
    <div className="app">
      {/* Navbar sits outside <Routes>, so it stays on screen across every
          page — only the content below it swaps as you navigate. */}
      <Navbar />

      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddGamePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}
