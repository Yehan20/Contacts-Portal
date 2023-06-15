import React from 'react'
import { Outlet } from 'react-router'
import Loader from '../components/loader'
import { useGlobalContext } from '../context/context'

const RootLayout = () => {
  const {appLoading} = useGlobalContext()
  return (
       <> 
           {appLoading && <Loader/>}
          <Outlet/> 
       </>
  )
}

export default RootLayout