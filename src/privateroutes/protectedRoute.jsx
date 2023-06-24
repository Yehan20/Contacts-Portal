import React from 'react'
import { Navigate } from 'react-router-dom'
import { useGlobalContext } from '../context/context'

const ProtectedRoute = ({children}) => {
    const {userdata} = useGlobalContext()
    // console.log(loggedUser)
  
    if(userdata){
      return <Navigate to={'/contacts'} replace={true}/>
    } 
    return userdata?'': children
  
}

export default ProtectedRoute