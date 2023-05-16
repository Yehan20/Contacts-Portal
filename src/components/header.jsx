import React from 'react'
import Logo from '../assets/images/twcLogo.svg'
const Header = () => {
  return (
    <div className='text-white mb-16'>
      <img src={Logo} alt="Logo" />
      <h3 className='text-3xl font-bold'>contacts <br />
       <span className='font-normal'>portal</span> 
      </h3>
    </div>
  )
}

export default Header