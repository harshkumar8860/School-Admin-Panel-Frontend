import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import AdminRoutes from './routes/AdminRoutes'
import Login from './pages/Login'
import ProtectedRoute from './routes/ProtectedRoute'
import TeacherAttendanceModal from './components/TeacherAttendanceModal'

function App() {

  return (
    <BrowserRouter>
      <TeacherAttendanceModal />
      <Routes>
        {/* Public */}
        <Route path='/login' element={<Login />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AdminLayout />} >
            {AdminRoutes()}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
