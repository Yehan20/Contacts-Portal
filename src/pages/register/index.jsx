import React from 'react'
import { Link } from 'react-router-dom'
import SideBar from '../../components/sideBar'

const Register = () => {
    return (
        <div className="register-section">
            <div className='register'>
                <h2>Register Now
                </h2>
                <form action="">
                    <div>
                        <input type="email" placeholder='email' required/>
                    </div>
                    <div>
                        <input type="passowrd" placeholder='create password' required/>
                    </div>
                    <div>
                        <input type="passowrd" placeholder='confirm password' required/>
                    </div>
                    <div>
                        <button type='submit'>register</button>

                    </div>
                    <Link to='register'>Click here to register</Link>
                </form>
                <SideBar/>
            </div>
        </div>
    )
}

export default Register
