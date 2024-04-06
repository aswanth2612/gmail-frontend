import React, { useState } from 'react'
import '../App.css';
import Axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import { useUserDispatch } from '../provider/UserProvider';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [user, setUser] = useState('');
    const dispatch = useUserDispatch();

    const navigate = useNavigate()

    Axios.defaults.withCrendentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post(import.meta.env.VITE_BACKEND_PATH + '/login', { email, password }).then(response => {
            if (response.data.status) {
                setUser({ username: response.data.username, email: response.data.email });
                dispatch({
                    type: 'set',
                    username: response.data.username,
                    email: response.data.email
                });
                navigate('/email/index')
            }
        }).catch(err => {
        })
    }

    return (
        <div className='sign-up-container'>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <h2>Login</h2>

                <label htmlFor="email">Email:</label>
                <input type="email" autoComplete='off' placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password:</label>
                <input type="password" placeholder='********'
                    onChange={(e) => setPassword(e.target.value)} />

                <button type='submit'>Login</button>
                <Link to="/forgotPassword">Forgot Password</Link>
                <p>Don't hava an Account? <Link to="/signup">Sign Up</Link> </p>
            </form>
        </div>
    )
}

export default Login
