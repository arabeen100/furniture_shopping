import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForgotPasswoedMutation } from '@/features/api/apiSlice'
import background from '../../assets/background.webp'
import { setUserEmail } from '@/features/forgotpassword/forgotPassword'
import { setForgotPassStatus, setSignupStatus } from '@/features/responseStatus/responseStatusSlice'
import { useDispatch,useSelector } from 'react-redux'
const Forgotpassword = () => {
  const dispatch=useDispatch();
  const {userEmail}=useSelector((state)=>state.forgotPass)
  const[emailRequired,setEmailRequired]=useState("");
  const[emailError,setEmailError]=useState("");
    const[showMessage,setShowMessage]=useState(false);
  
  const navigate=useNavigate();
  const [email,{isError}]=useForgotPasswoedMutation();
   useEffect(()=>{
         const footer=document.querySelector("footer")
         footer.classList.add("hidden")
         return()=>{
           footer.classList.remove("hidden")
         }
       },[])
         useEffect(()=>{
           const plusButton=document.querySelector(".plusButton")
           plusButton.classList.add("hidden")
           return()=>{
             plusButton.classList.remove("hidden")
           }
         },[])
        useEffect(()=>{
                 if(isError){
                  setShowMessage(true);
                  const timer=setTimeout(()=>{
                    setShowMessage(false);
                 },3000)
                return ()=>clearTimeout(timer);
                 }
           },[isError])
  const handleSubmit=async(e)=>{
     e.preventDefault();
     if(!userEmail.trim()){
      setEmailRequired("This field is required")
     }
     const formData = new FormData();
     formData.append("email",userEmail);
     try{
     const response=await email(formData).unwrap();
     dispatch(setForgotPassStatus(response.status));
     dispatch(setSignupStatus(false))
     if(response.status){
     navigate("/auth/verifyemail");}
     }catch(e){
      console.log(e.data.errors)
      setEmailError(e.data.errors[0])
     }
  }
  return (
    <div className='larger:flex larger:items-start'>
    {isError&&<p className={` fixed top-[23px] left-[50%] -translate-x-[50%] transition-all duration-400 ${showMessage?"translate-y-0":"-translate-y-[150px]"} bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>{emailError}❌</p>}
    <div className=' w-full h-[calc(100vh-90px)] grid place-content-center   larger:w-[50%]'>
       <form className='flex flex-col gap-5 w-[325px] text-right' onSubmit={handleSubmit}>
        <p className='text-2xl text-center'>إعادة تعيين كلمة المرور</p>
        <div>
        <label className='text-right' htmlFor='email'>البريد الإلكتروني</label>
        <input
        className='text-right text-sm w-[325px] h-[45px] p-1 outline-0 border-[.5px] focus:border-2 focus:border-[#042e2e] rounded-sm'
        id='email'
        type='email'
        placeholder='Type your email'
        value={userEmail}
        onChange={(e)=>{dispatch(setUserEmail(e.target.value))}}
        />
        {(emailRequired&&!userEmail) &&<p className="text-red-500 text-xs text-right">{emailRequired}</p>}

        </div>
        <button type='submit' className='mt-1.5 w-[325px] h-[40px] grid place-content-center border bg-[#042e2e] text-white text-sm rounded-lg cursor-pointer hover:opacity-85'>إرسال بريد إلكتروني لإعادة تعيين كلمة المرور</button>
        

       </form>
    </div>
     <img src={background} alt='background' loading='lazy' width='735' height='735' className='hidden larger:block' />
     </div>
  )
}

export default Forgotpassword

