import React from 'react'
import { Navigate } from 'react-router-dom'
import { useGlobalContext } from '../context/context'

const ProtectedRoute = ({children}) => {
    const {userData} = useGlobalContext()
    // console.log(loggedUser)
  
    if(userData){
      return <Navigate to={'/contacts'} replace={true}/>
    } 
    return userData?'': children
  
}

export default ProtectedRoute