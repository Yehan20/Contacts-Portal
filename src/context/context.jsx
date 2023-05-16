// Consits of the auth operations and store of the jwt token
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
  //reacr router based hooks
  //const navigate = useNavigate(); 

  axios.defaults.withCredentials=true;

  const [loggedUser,setLoggedUser] = useState(null)
  const [showMessageModal,setShowMessageModal] = useState(false)
  const [errorMessage,setErrorMessage] = useState('');
  const [userdata,setUserData] = useState('');
  const [success,setSuccess]= useState('');
  const [loading,setLoading] = useState(true)



  const closeModal = ()=>{
    setErrorMessage('');
    setShowMessageModal(false)
  }

  const isLogged = async()=>{
     console.log('run');
     try{
      const user = await axios.get('http://localhost:3001/login')
      console.log(user.data)
      setUserData(user.data.user)
      setLoggedUser(user.data.isLogged)
  
     }catch(e){
      if(e.response.data){
         setLoggedUser(e.response.data.isLogged)
      
      }
     }
  }

  const loginUser = async(email,password)=>{
     try{
      const user = await axios.post('http://localhost:3001/login',{email,password})
      // update states
      setUserData({email:user.data.email,_id:user.data.id});
      setLoggedUser(true)

      // store token i local storeage
      localStorage.setItem('accessToken',user.data.accessToken);
   
     }catch(e){
      // wrong login 
      console.log(e.response.data.message);
       setErrorMessage(e.response.data.message);
       setShowMessageModal(true);
     }
  }

  const register = async(email,password)=>{
    setUserData('')
      try{
         await axios.post('http://localhost:3001/register',{email,password});
         setSuccess(true)
         setShowMessageModal(true)
      }catch(e){
         console.log(e.response.data.message);
         // can be same email or else
        setErrorMessage(e.response.data.message);
        setShowMessageModal(true)
      }
  }

  const logout = async(_id)=>{
   console.log('logouts')
     try{
       await axios.delete('http://localhost:3001/logout/'+ _id.toString())
       localStorage.removeItem('accessToken'),
       setUserData('')
       setLoggedUser(false)
     }catch(e){
        console.log(e)
     }
  }


  return (
    <AppContext.Provider value={{isLogged,
          loggedUser,
          showMessageModal,
          setShowMessageModal,
          loginUser,
          errorMessage,
          closeModal,
          userdata,
          register,
          success,
          logout
          
          }}>
       {children}
    </AppContext.Provider>
  )
}
const useGlobalContext = ()=>{
     return useContext(AppContext)
}

export {useGlobalContext,AppContext}
export default AppProvider