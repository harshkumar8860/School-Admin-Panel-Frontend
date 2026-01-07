import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSchool } from '../context/SchoolContext'
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"

const Login = () => {
  const { login } = useSchool();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(email, password);

    if (!success) {
      setError("Invalid credentials or unauthorized role");
      return;
    }
    navigate("/", { replace: true });
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-6 rounded shadow w-full max-w-sm space-y-4'
      >
        <h2 className='xl font-semibold text-center'>Login</h2>

        {error && <p className='text-red-500 text-sm'>{error}</p>}

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" variant='primary' className="w-full">Login</Button>
      </form>
    </div>
  )
}

export default Login