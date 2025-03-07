import React from 'react'
import { useDispatch } from 'react-redux'
import { ifRegister } from '@/features/register/registerSlice'
import { Link } from 'react-router-dom'
const Login = () => {
  const dispatch=useDispatch();
  return (
    <div >
    <Link to="/" onClick={()=>{dispatch(ifRegister())}} className='w-[130px] h-[30px] grid place-content-center border bg-amber-500 text-white'>
        samy
    </Link>
  </div>
  )
}

export default Login