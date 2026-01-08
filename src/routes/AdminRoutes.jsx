import React from 'react'
import { Route } from 'react-router-dom'
import Dashboard from "../pages/Dashboard"
import Users from "../pages/Users"
import Attendance from '../pages/Attendance'
import Subjects from '../pages/Subjects'
import Teachers from '../pages/Teachers'
import Students from '../pages/Students'
import Sections from '../pages/Sections'
import Classes from '../pages/Classes'
import RoleProtectedRoute from './RoleProtectedRoute'
const AdminRoutes = () => {
  return (
    <>
      {/* Accessible to ADMIN & TEACHER */}
      <Route index element={<Dashboard />} />
      <Route path="attendance" element={<Attendance />} />

      {/* Admin only */}
      <Route element={<RoleProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route path="users" element={<Users />} />
        <Route path="classes" element={<Classes />} />
        <Route path="sections" element={<Sections />} />
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="subjects" element={<Subjects />} />
      </Route>
    </>
  )
}

export default AdminRoutes