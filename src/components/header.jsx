import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/images/twcLogo.svg'
const Header = () => {
  return (
    <div className='text-white mb-16'>
      <Link to='/' title='Go Home'><img src={Logo} alt="Logo" /></Link>
      <h3 className='text-3xl font-bold'>contacts <br />
       <span className='font-normal'>portal</span> 
      </h3>
    </div>
  )
}

export default Header