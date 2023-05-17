// Consits of the auth operations and store of the jwt token
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useContext } from 'react';


const AppContext = React.createContext();

const AppProvider = ({children}) => {

  axios.defaults.withCredentials=true;

  const [loggedUser,setLoggedUser] = useState(null)
  const [showMessageModal,setShowMessageModal] = useState(false)
  const [errorMessage,setErrorMessage] = useState('');
  const [userdata,setUserData] = useState('');
  const [success,setSuccess]= useState('');
  const [loading,setLoading] = useState(false)

  //refresh token function 

  const refreshToken = async () => {
   //refresh tken done

   console.log('refresh token method run')
   try {
     
      //http://localhost:3001/token/
      //https://twc-contact-portal-api.onrender.com/
      const response = await axios.post('https://twc-contact-portal-api.onrender.com/token',{
        id:userdata._id,
        token:localStorage.getItem('refreshToken')
     });
     
     const newToken = response.data.accessToken

     localStorage.setItem('accessToken', newToken);

   } catch (error) {
     console.log('Token refresh failed:', error);
   }
 };



  const closeModal = ()=>{
    setErrorMessage('');
    setShowMessageModal(false)
    setSuccess(false)
  }

  const isLogged = async()=>{
     console.log('run');
     //http://localhost:3001/login
     // https://glamorous-dove-skirt.cyclic.app/login
     try{
      const user = await axios.get('https://twc-contact-portal-api.onrender.com/login')
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
     setLoading(true)
     //http://localhost:3001/login
     //https://glamorous-dove-skirt.cyclic.app/login 
     try{
      const user = await axios.post('https://twc-contact-portal-api.onrender.com/login',{email,password})
      // update states
      setUserData({email:user.data.email,_id:user.data._id});
      setLoggedUser(true)
      setLoading(false)
      // store token i local storeage
      localStorage.setItem('accessToken',user.data.accessToken);
      localStorage.setItem('refreshToken',user.data.refreshToken)
   
     }catch(e){
      // wrong login 
      console.log(e.response.data.message);
       setErrorMessage(e.response.data.message);
       setShowMessageModal(true);
       setLoading(false)
     }
  }

  const register = async(email,password)=>{
    setLoading(true)
    setUserData('')

      try{
         await axios.post('https://twc-contact-portal-api.onrender.com/register',{email,password});
         setSuccess(true)
         setShowMessageModal(true)
         setLoading(false)

      }catch(e){
         console.log(e.response.data.message);
         // can be same email or else
        setErrorMessage(e.response.data.message);
        setShowMessageModal(true)
        setSuccess(false)
        setLoading(false)
      }
  }

  const logout = async(_id)=>{
   console.log('logouts')
     try{
       await axios.delete('https://twc-contact-portal-api.onrender.com/logout/'+ _id.toString())

       localStorage.removeItem('accessToken'),
       localStorage.removeItem('refreshToken')
       localStorage.removeItem('contactAmount')

       setUserData('')
       setLoggedUser(false)
     }catch(e){
        console.log(e)
     }
  }

  useEffect(() => {
   if(!isLogged) return
   const refreshInterval = setInterval(refreshToken,1500000); // Refresh token every 25 minutes

   return () => {
     clearInterval(refreshInterval);
   };
 }, [userdata]);


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
          logout,
          loading
          
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