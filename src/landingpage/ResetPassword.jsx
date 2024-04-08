import React, { useState } from 'react'
import '../App.css';
import authservice from '../services/AuthService';
import { useNavigate, Link, useParams } from 'react-router-dom'


const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const { token } = useParams()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        authservice.post("/reset-password/" + token, { password }).then(response => {
            if (response.data.status) {
                navigate('/login')
            }
        }).catch(err => {
        })
    }
    return (
        <div className='sign-up-container'>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <h2>Reset Password</h2>

                <label htmlFor="password">New Password:</label>
                <input type="password" placeholder='********'
                    onChange={(e) => setPassword(e.target.value)} />

                <button type='submit'>Reset</button>
            </form>
        </div>
    )
}

export default ResetPassword
