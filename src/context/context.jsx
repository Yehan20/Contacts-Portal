// Consits of the auth operations and store of the jwt token
import React from 'react'
import { useContext } from 'react';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
  return (
    <AppContext.Provider value={"hi"}>
       {children}
    </AppContext.Provider>
  )
}
const useGlobalContext = ()=>{
     return useContext(AppContext)
}

export {useGlobalContext,AppContext}
export default AppProvider