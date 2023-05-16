import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import MessageModal from '../../components/messageModal';
import { useGlobalContext } from '../../context/context';

const AddContact = () => {
  axios.defaults.withCredentials=true;
  // context api values
  const {showMessageModal,setShowMessageModal,loginUser,userdata,closeModal} = useGlobalContext()
 
// state
  const [contactUser,setContactUser]= useState({
    contactFullName:'',
    contactEmail:'',
    contactGender:'',
    contactNumber:''
  })

  const [addedContact,setAddedContact] = useState('')

  const handleInput = (target)=>{
     const name = target.name;
     const value = target.value;
     setContactUser({...contactUser,[name]:value})
     console.log(contactUser);
  }

  const handleSubmit = async(e)=>{

    e.preventDefault();
    if(contactUser.contactEmail==='' || 
       contactUser.contactFullName==='' ||
       contactUser.contactGender===''   || 
       contactUser.contactNumber===''){

      setShowMessageModal(true)
      return
    }


    //get our jwt token and header set up
    const token = localStorage.getItem('accessToken')
    const headers =  {
      "Authorization":token,
      "Content-Type": 'application/json'
    }

    
    try{
      const newUser = await axios.post('http://localhost:3001/contacts/add',{

        fullName:contactUser.contactFullName,
        gender:contactUser.contactGender,
        phoneNumber:contactUser.contactNumber,
        email:contactUser.contactEmail

      },{headers})
      console.log(newUser.data)
      setAddedContact(newUser.data)

    }catch(e){
      console.log(e);
      
    }

  }

  return (
   <>
    <div className='add-contact px-30'>

    <h2 className='text-white font-bold text-heading-large mb-14'>New Contact</h2>

   <form onSubmit={handleSubmit} className=''>

   <div className='flex flex-col lg:flex-row'>

    <div className='mb-8 w-full'>
        <input name='contactFullName' value={contactUser.contactFullName}  onChange={(e)=>handleInput(e.target)}   type="text" placeholder='full name'/>
        </div>
        <div className='mb-8 w-full'>
            <input name='contactEmail' value={contactUser.contactEmail}  onChange={(e)=>handleInput(e.target)} type="email" placeholder='email'/>
        </div>
   </div>

    <div className='flex flex-col lg:flex-row'>
      <div className='mb-12 w-full'>
            <input name='contactNumber' value={contactUser.contactNumber} onChange={(e)=>handleInput(e.target)}  type="number" placeholder='phone number'/>
        </div>

      <div className='flex text-white mb-12 w-full gap-11 items-center'>
        <span className='text-xl font-normal'>gender </span>
         <div className='flex items-center'>
           <input id='m'  type="radio" name="contactGender"  className='appearance-none border-2 rounded-full  bg-greenColor checked:bg-white' value="male" checked={contactUser.contactGender==='male'} onChange={(e)=>handleInput(e.target)}/>
           <label className='text-xl font-normal' htmlFor='m'> male </label>
         </div>
        
        <div className='flex items-center'>
        <input type="radio" id='f' className=' appearance-none border-2 rounded-full  bg-greenColor checked:bg-white' name="contactGender" value="female" checked={contactUser.contactGender ==='female'} onChange={(e)=>handleInput(e.target)} />
        <label className='text-xl font-normal' htmlFor='f'>female</label>

        </div>
      </div>
    </div>


     <div className='text-white text-text-buttons  mb-5'>
     <button  type='submit' title='Click to add' className='custom-button'>Add your first Contact</button>

     </div>
    </form>
   </div>
   {(showMessageModal) && <MessageModal message={"Please fill feilds"}/>}
   {(addedContact) && <MessageModal canRedirect={true} message={"New contact saved"}/>}
   </>

  )
}

export default AddContact