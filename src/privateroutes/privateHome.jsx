import React from 'react'
import { Navigate } from 'react-router-dom'

import { useGlobalContext } from '../context/context'

const PrivateRoute = ({children}) => {
  // This would protect our home form unlogged users
  const {userData} = useGlobalContext()
  // const navigate = useNavigate() 
  
  if(userData){
    return children
  } 
  return userData===''?'':<Navigate to={'/'} replace={true}/>
}

export default PrivateRoute