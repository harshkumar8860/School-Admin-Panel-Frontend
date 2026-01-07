import React from 'react'
import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }) => `block px-4 py-2 rounded-md text-sm font-medium 
${isActive ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-800"}`;

const Sidebar = () => {
  return (
    <aside className='w-64 bg-slate-900 text-white flex flex-col'>
      <div className='p-6 text-xl font-bold border-b border-slate-700'>
        School Admin
      </div>

      <nav className='flex-1 p-4 space-y-2'>
        <NavLink to="/" end className={linkClass}>Dashboard</NavLink>
        <NavLink to="/users" className={linkClass}>Users</NavLink>
        <NavLink to="/classes" className={linkClass}>Classes</NavLink>
        <NavLink to="/sections" className={linkClass}>Sections</NavLink>
        <NavLink to="/students" className={linkClass}>Students</NavLink>
        <NavLink to="/teachers" className={linkClass}>Teachers</NavLink>
        <NavLink to="/subjects" className={linkClass}>Subjects</NavLink>
        <NavLink to="/attendance" className={linkClass}>Attendance</NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar;