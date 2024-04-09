import React, { useState } from 'react'
import '../App.css';
import { useNavigate, Link, useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios';


const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_BACKEND_PATH}/auth/reset-password?token=${ searchParams.get("token") }`,
         { password }).then(response => {
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
