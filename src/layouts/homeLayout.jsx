import React from 'react'
import { Outlet } from 'react-router'
import Footer from '../components/footer'
import Header from '../components/header'

const HomeLayout = () => {
  return (
    <div className="outer">
      <div className='inner py-28 px-32'>
        <Header/>
        <Outlet/>
        <Footer/>
        </div>
    </div>

  )
}

export default HomeLayout