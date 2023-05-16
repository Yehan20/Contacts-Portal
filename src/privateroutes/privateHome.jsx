import React from 'react'
import { Navigate } from 'react-router'
import { useGlobalContext } from '../context/context'

const PrivateRoute = ({children}) => {
  // This would protect our home form unlogged users
  const {loggedUser} = useGlobalContext()
  
  if(loggedUser){
    return children
  } 
  return loggedUser===null?'':<Navigate to={'/'} replace={true}/>
}

export default PrivateRoute