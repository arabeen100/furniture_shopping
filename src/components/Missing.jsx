import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <div className='h-90 grid place-content-center'>
        <p className='text-[#4cb4aa] text-9xl mb-20 text-center'>404</p>
        <p className='text-center mb-3'>Oops! The page you are looking for does not exist</p>
        <p className='text-center'>Go back to <Link className='text-[#4cb4aa]' to='/'>Home</Link></p>
    </div>
  )
}

export default Missing