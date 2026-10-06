import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { BackgroundFX } from './components/ui/BackgroundFX'
import { LibraryPage } from './pages/LibraryPage'
import { GamePage } from './pages/GamePage'

export default function App() {
  return (
    <BrowserRouter>
      <BackgroundFX />
      <Routes>
        <Route path="/" element={<LibraryPage />} />
        <Route path="/jogo/:slug" element={<GamePage />} />
        {/* /jogos era o endereço da lista quando havia tela de entrada.
            Mantido como redirecionamento para não quebrar link já enviado. */}
        <Route path="/jogos" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
