import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import MessageModal from '../../components/messageModal';
import MessagePromptModal from '../../components/messagePromt';

import Tablerow from '../../components/tablerow';
import { useGlobalContext } from '../../context/context';



const Home = () => {
    const {setShowMessageModal,showMessageModal} = useGlobalContext()
    
    // to allow us pass the jwt token
    const token = localStorage.getItem('accessToken')

    const headers =  {
    "Authorization":token,
    "Content-Type": 'application/json'
   }



    axios.defaults.withCredentials=true;

    const [contacts,setContacts]= useState([]);
    const [showPromptModal,setShowPromptModal] =useState(false);
    const [deleteUser,setDeleteUser]=useState('');
    const [loading,setLoading]=useState(false);


    const togglePrompt=()=>{
         setShowPromptModal(!showPromptModal)
    }
   
    const deleteContact = async(id)=>{
        try{
            const result =await axios.delete('http://localhost:3001/contacts/delete/'+id,{headers})
            setContacts(result.data.contacts);
            setShowPromptModal(false);
            setShowMessageModal(true);
        }catch(e){
            console.log(e.response.data.message)
        }

    }

    const updateContact = async(updatedUser)=>{

     setDeleteUser('')
     const newUser={ 
            newFullName:updatedUser.modifiedFullName,
            newEmail:updatedUser.modifiedEmail,
            newNumber:updatedUser.modifiedNumber,
            newGender:updatedUser.changeGender,
            id:updatedUser._id,
     }
     try{
         const result = await axios.put('http://localhost:3001/contacts/update',newUser,{headers})
         setContacts(result.data.contacts)
         setShowMessageModal(true)
     }catch(e){
         console.log(e.response.data.message);

     }
    }

    useEffect(()=>{
        setLoading(true)
        const abortController = new AbortController();
        const signal = abortController.signal;
        const getContacts =  async()=>{
            

            try{
            const contactList = await axios.post("http://localhost:3001/contacts/show",{},{headers},signal)

                console.log(contactList.data.contacts)
                setContacts(contactList.data.contacts)
                localStorage.setItem("contactAmount",contactList.data.contacts.length);
                setLoading(false)
            }catch(e){
                console.log(e.response.data.message);
                setLoading(false)
            }
        }

        getContacts()
        return ()=> abortController.abort() // to remove the fetch if go to sudden route
    },[])


    return (
        <>
        
         {contacts.length<1 && <div className='text-white'>
            <h2 className='text-heading-large font-bold'>
                Hello
            </h2>
            <p className='text-heading-medium leading-tight mb-12 '>
                Looks like you have not added any contacts click below to add one
            </p>
            <Link to='/contacts/new' className='text-2xl custom-button' title='Click to Add'>add your first contact</Link>
        </div>}
        {contacts.length>0 &&
        <div>
   
        <div className='flex items-start justify-between mb-10 flex-col gap-y-2 sm:flex-row sm:items-center'>
           <h2 className='text-4xl text-white font-bold '>
            Contacts
            </h2>
            <Link to='/contacts/new' className='text-lg custom-button'>Add new Contact</Link>
         </div>

         <div className='bg-white  px-2 lg:px-10 py-5 rounded-3xl'>
           <table className='w-full text-greenColor border-separate border-spacing-2 lg:border-spacing-4'>
              <thead>
                <tr className='hidden lg:table-row font-normal'>
                    <th></th>
                    <th>full name</th>
                    <th>gender</th>
                    <th>e-mail</th>
                    <th>phone number</th>
                    <th>
                   
                    </th>
                </tr>
              </thead>
              <tbody>
                 {
                    !loading && contacts.map((contact)=>{
                        return <Tablerow key={contact._id} 
                                         updateContact={updateContact} 
                                         contact={contact}
                                         showPromptModal={showPromptModal}
                                         togglePrompt={togglePrompt}
                                         setDeleteUser={setDeleteUser}
                                        
                      />
                    })
                 }
                 {loading && <tr><td>Loading..</td></tr>}

              </tbody>
           </table>
        </div>
        </div>}

        {showMessageModal && <MessageModal message={"Your contact has been saved successfully!"}/>}

        {showPromptModal &&  <MessagePromptModal  deleteContact={deleteContact} 
           deleteUser={deleteUser} togglePromptModal={togglePrompt} fullName={"Name"}/>}

        {(showMessageModal && deleteUser) &&  <MessageModal message={"Your contact has been deleted successfully!"}/>}
      </>

    )
}

export default Home
