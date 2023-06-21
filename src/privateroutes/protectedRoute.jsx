import React from 'react'
import { Navigate } from 'react-router-dom'
import { useGlobalContext } from '../context/context'

const ProtectedRoute = ({children}) => {
    const {loggedUser} = useGlobalContext()
  
    if(loggedUser){
      return <Navigate to={'/contacts'} replace={true}/>
    } 
    return loggedUser?'': children
  
}

export default ProtectedRoute