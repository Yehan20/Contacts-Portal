import React from 'react'
import { Link } from 'react-router-dom'
import SideBar from '../../components/sideBar'

const Login = () => {
    return (
        <div className="login-section">
            <div className='login'>
                <h2>Hi There
                    <br/>
                    <span>Welcome to our contacts portal</span>
                </h2>
                <form action="">
                    <div>
                        <input type="email" placeholder='email' required/>
                    </div>
                    <div>
                        <input type="passowrd" placeholder='password' required/>
                    </div>
                    <div>
                        <button type='submit'>login</button>
                        or
                        <Link to='register'>Click here to register</Link>
                    </div>
                </form>
                <SideBar/>
            </div>
        </div>

    )
}

export default Login
