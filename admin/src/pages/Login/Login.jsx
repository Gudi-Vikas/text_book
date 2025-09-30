import React, { useEffect, useState } from 'react'
import "./Login.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

const Login = ({ url }) => {
  const navigate = useNavigate()
  const { isAuthed, login } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthed) navigate('/skills', { replace: true })
  }, [isAuthed, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const resp = await axios.post(`${url}/api/auth/login`, { username, password })
      if (resp.data?.success && resp.data?.token) {
        login(resp.data.token)
      } else {
        setError(resp.data?.message || 'Login failed')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Admin Login</h2>

        <label className="login-label">Username</label>
        <input
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />

        <label className="login-label">Password</label>
        <input
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        {error ? <p className="error-text">{error}</p> : null}

        <button className="login-button" type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}

export default Login
