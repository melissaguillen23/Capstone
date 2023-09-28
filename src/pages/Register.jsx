import React, { useState } from "react"
import { api } from "../API/CS_API"
import { useNavigate } from "react-router-dom"

export default function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await api.registerUser(username, email, password)
            navigate('/auth/login')
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="register">
            <h1>Sign up</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
            </form>
        </div>
 
    )
}