import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div className='text-white'>
            <h2 className='text-heading-medium sm:text-heading-large font-bold'>
                Welcome
            </h2>
            <p className='text-lg sm:text-heading-medium leading-tight mb-12 '>
                This is where your contacts will live. Click the button below 
                to add a new contact
            </p>
            <div className='flex flex-col gap-x-2 gap-y-3 sm:flex-row'>
            <Link to='/contacts/new' className='text-2xl custom-button' title='Click to Add'>add your first contact</Link>
            <Link to='/contacts/all' className='text-2xl custom-button' title='Click to View'>view your contacts</Link>
            </div>
        </div>
  )
}

export default Welcome