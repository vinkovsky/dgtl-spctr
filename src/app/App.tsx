import React, { FC, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { LinearProgress } from '@mui/material'

// import Launch from '@features/launch/Launch'
// import Home from '@features/home/Home'

import '@styles/global.css'

const Home = lazy(() => import('../features/home/Home'))
const Launch = lazy(() => import('../features/launch/Launch'))

const App: FC = () => {
  return (
    <Router>
      <Suspense fallback={<LinearProgress />}>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/:id'} element={<Launch />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
