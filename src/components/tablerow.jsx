import React from 'react'
import { useState } from 'react'
import { FaPencilAlt, FaTrash,FaSyncAlt } from 'react-icons/fa'
import Man from '../assets/images/man.png'
import Women from '../assets/images/women.png'
import { useGlobalContext } from '../context/context'
import MessagePromptModal from './messagePromt'


const Tablerow = ({contact,updateContact,togglePrompt,setDeleteUser}) => {
  
  // global


  const [edit,setEdit] = useState(false);
  const [changeGender,setChangeGender] = useState(contact.gender)

  const [modifedUser,setModifiedUser]= useState({
    modifiedFullName:contact.fullName,
    modifiedEmail:contact.email,
    modifiedNumber:contact.phoneNumber,
    _id:contact._id
  })

  const handleChange = (target)=>{
    const name = target.name;
    const value = target.value;
    setModifiedUser({...modifedUser,[name]:value})

 }

 const handleSave=()=>{
     setEdit(!edit)
     updateContact({...modifedUser,changeGender});
 }

  // toggling funciton
  const toggleEdit =()=>{
     setEdit(!edit);
  }   
  const toggleGender =(gender)=>{
    if(gender==='male') setChangeGender("female");
    else  setChangeGender("male")
  }  

  const toggleDeletePrompt=()=>{
     setDeleteUser(contact);
     togglePrompt();
  }


  return (
       <>
         <tr>
          <td><img alt='gender' className='w-10 h-10' src={contact.gender==="male"?Man:Women}/></td>

          <td>{edit?(
               <input name='modifiedFullName' onChange={(e)=>handleChange(e.target)}
               className='bg-slate-200 px-2 py-1' value={modifedUser.modifiedFullName}/>):
                contact.fullName}
          </td>

          <td>
            {edit?(
              <span className='flex  items-center  gap-1 bg-slate-200 px-2 py-1'>{changeGender}
               <FaSyncAlt className='cursor-pointer' size={'10px'} onClick={()=>toggleGender(changeGender)}/> 
             </span>
            ):contact.gender}
          </td>

          <td>{edit?(
              <input  name='modifiedEmail' onChange={(e)=>handleChange(e.target)} 
              className='bg-slate-200 px-2 py-1' value={modifedUser.modifiedEmail}/>):
              contact.email}
          </td>

          <td>{edit?
               (<input  name='modifiedNumber' onChange={(e)=>handleChange(e.target)}  className='bg-slate-200 px-2 py-1' value={modifedUser.modifiedNumber}/>
               ):contact.phoneNumber}
         </td>

         <td>
            <div className='flex justify-end gap-3'>
               {edit?<button onClick={handleSave} className='bg-greenColor hover:opacity-70 text-white inline-block px-3 py-1 rounded-2xl'>save</button>:
                  <>
                  <button onClick={toggleEdit}><FaPencilAlt color='#083F46'/></button>
                    <button onClick={toggleDeletePrompt} ><FaTrash color='#083F46'/></button>
                  </>
               }
            </div>
          </td>
        </tr>
        
       </>

  )
}

export default Tablerow