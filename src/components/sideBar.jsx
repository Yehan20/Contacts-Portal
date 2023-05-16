import React from 'react'
import logo from '../assets/images/main-logo.svg'
const SideBar = () => {
  return (
    <div className='w-full side-bar flex items-center '>
       <div className='ps-28'>
         <img src={logo} className='w-36' alt="Logo" />
         <h2 className='text-greenColor text-heading-very-large font-bold leading-none'>contacts <br /> 
         <span className='font-normal'> portal</span></h2>
       </div>
    </div>
  )
}

export default SideBar