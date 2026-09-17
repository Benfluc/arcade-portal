import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { BackgroundFX } from './components/ui/BackgroundFX'
import { LoginPage } from './pages/LoginPage'
import { LibraryPage } from './pages/LibraryPage'
import { GamePage } from './pages/GamePage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BackgroundFX />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/biblioteca" element={<LibraryPage />} />
            <Route path="/jogo/:slug" element={<GamePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
