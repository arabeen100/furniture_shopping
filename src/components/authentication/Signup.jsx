import React from 'react'
import { Link } from 'react-router-dom'
const Signup = () => {
  return (
    <div>
    <Link to="/auth/login" className='w-[130px] h-[30px] grid place-content-center border bg-amber-500 text-white'>
        resgister
    </Link>
    </div>
  )
}

export default Signup