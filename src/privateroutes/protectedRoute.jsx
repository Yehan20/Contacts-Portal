import React from 'react'
import { Navigate } from 'react-router'
import { useGlobalContext } from '../context/context'

const ProtectedRoute = ({children}) => {
    const {loggedUser} = useGlobalContext()
  
    if(loggedUser){
      return <Navigate to={'/home'} replace={true}/>
    } 
    return loggedUser===null?'': children
  
}

export default ProtectedRoute