import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import AdminRoutes from './routes/AdminRoutes'

function App() {

  return (<BrowserRouter>
    <Routes>
      <Route path="/" element={<AdminLayout />} >
        {AdminRoutes()}
      </Route>
    </Routes>
  </BrowserRouter>)
}

export default App;
