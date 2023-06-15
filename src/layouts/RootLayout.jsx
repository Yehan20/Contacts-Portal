import React from 'react'
import { Outlet } from 'react-router'
import Loader from '../components/loader'
import { useGlobalContext } from '../context/context'

const RootLayout = () => {
  const {loading} = useGlobalContext()
  return (
       <> 
           {loading && <Loader/>}
          <Outlet/> 
       </>
  )
}

export default RootLayout