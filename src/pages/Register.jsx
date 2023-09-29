import React, { useState } from "react"
import { api } from "../API/CS_API"
import { useNavigate } from "react-router-dom"

export default function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()
 
    const handleSubmit = async (e) => {
        e.preventDefault()

        if(password !== confirmPassword) {
            setError("Passwords do not match.")
            return;
        }
            const newUser = {
                email: email,
                username: username,
                password: password,
            };
            try {
                const data = await api.registerUser(username, email, password )            

                if (data && data.id) {
                    alert("Registration successful! Please login.");
                    localStorage.setItem(`user_${data.id}`, JSON.stringify(newUser));
                    navigate('/auth/login')
                } else {
                    setError("Registration failed. Please try again.")
                } 
            } catch (err) {
                setError("An error occured. Please try again.")
            }
            
        };

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
            <input 
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit">Register</button>
            </form>
        </div>
 
    )
}