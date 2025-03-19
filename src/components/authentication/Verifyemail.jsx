import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import background from "../../assets/background.webp"
import { useSelector,useDispatch } from 'react-redux'
import { useVerifyEmailMutation,useResendCodeMutation,useResetPasswoedMutation } from '@/features/api/apiSlice'
import { useNavigate } from 'react-router-dom'
import { setResetPass } from '@/features/verifycode/verifyCodeSlice'
const Verifyemail = () => {
  const dispatch=useDispatch();
  const[status,setStatus]=useState(false);
  const[requiredError,setRequiredError]=useState('');
  const [firstDigit,setFirstDigit]=useState("");
  const [secondDigit,setSecondDigit]=useState("");
  const [thirdDigit,setThirdDigit]=useState("");
  const [forthDigit,setForthDigit]=useState("");
  const input2Ref=useRef(null)
  const input3Ref=useRef(null)
  const input4Ref=useRef(null)
  const {email}=useSelector((state)=>state.signup)
  const{signupStatus,forgotPassStatus}=useSelector((state)=>state.responseStatus)
  const{userEmail}=useSelector((state)=>state.forgotPass);
  const [code]=useVerifyEmailMutation();
  const[resend]=useResendCodeMutation();
  const[showMessage,setShowMessage]=useState(false)
  const navigate=useNavigate();
  useEffect(() => {
    console.log("Status updated:", status);
  }, [status]);
  
  useEffect(() => {
    console.log("Error updated:", requiredError);
  }, [requiredError]);
  
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
          if(status||requiredError){
           setShowMessage(true);
           const timer=setTimeout(()=>{
             setShowMessage(false);
          },3000)
         return ()=>clearTimeout(timer);
          }
    },[status,requiredError])
      
    const handleSubmit=async(e)=>{
      e.preventDefault();
      if(signupStatus){
      let verificationCode=`${firstDigit}${secondDigit}${thirdDigit}${forthDigit}`
      const formData=new FormData();
      formData.append("email", email);
      formData.append("verificationCode",verificationCode);
      try{
           const response= await code(formData).unwrap();
           if(response.status){
           navigate("/auth/login")
          }
     }catch(e){
      setStatus(false)
       console.log(e?.data?.errors) 
       setRequiredError(e?.data?.errors)
       
     }
   }else if(forgotPassStatus){
     dispatch(setResetPass(`${firstDigit}${secondDigit}${thirdDigit}${forthDigit}`))
    navigate("/auth/resetpass")
   }
   

 }
 const handleResendcode=async()=>{
  if(signupStatus){
   const formData = new FormData();
   formData.append('email',email);
   formData.append('codeType', "VerificationCode");
   try{
    const response=await resend(formData).unwrap();
    setRequiredError("");
    setStatus({status:response.status})
   }catch(e){
    console.log(e.data.errors)
   }
  }else if(forgotPassStatus){
    const formData = new FormData();
    formData.append('email',userEmail);
    formData.append('codeType', "ResetPasswordCode");
    try{
     const response=await resend(formData).unwrap();
     setRequiredError("")
     setStatus({status:response.status});
    }catch(e){
     console.log(e.data.errors)
    }
  }
}
  return (
    <div  className='larger:flex larger:items-start w-full '>
      <div className={` fixed top-[23px] left-[50%] -translate-x-[50%] transition-all duration-400  ${showMessage?"translate-y-0":"-translate-y-[250px]"}`}>
         {status&&<p className={`bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}> لقد تم إرسال البريد الإلكتروني إليك بنجاح✔️</p>}
         {requiredError&&<p className={` bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>{requiredError[0]||"Something Went Wrong, Please Try Again."}❌</p>}
      </div>
        <div className=' larger:w-[50%] grid place-content-center  h-[calc(100vh-85px)]'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-6 w-[300px]'>
            <label className='text-center font-bold text-xl' htmlFor='verify'>قم بإدخال الرمز المرسل إلي بريدك الإلكترونى   </label>
            <div className='flex gap-6'>
                <input
                autoFocus
                id='verify'
                maxLength="1"
                type='text'
                value={firstDigit.replace(/\D/g,"")}
                onChange={(e)=>{setFirstDigit(e.target.value);
                  if(e.target.value){
                  input2Ref.current.focus();}
                }}
                className='w-[55px] h-[55px] border-[1px] border-black outline-0 rounded-[5px] focus:border-2 text-center text-2xl'
                />
                <input
                id='verify'
                ref={input2Ref}
                maxLength="1"
                type='text'
                value={secondDigit.replace(/\D/g,"")}
                onChange={(e)=>{setSecondDigit(e.target.value);
                  if(e.target.value){
                  input3Ref.current.focus();}
                }}
                className='w-[55px] h-[55px] border-[1px] border-black outline-0 rounded-[5px] focus:border-2 text-center text-2xl'
                />
                <input
                id='verify'
                ref={input3Ref}
                maxLength="1"
                type='text'
                value={thirdDigit.replace(/\D/g,"")}
                onChange={(e)=>{setThirdDigit(e.target.value);
                  if(e.target.value){
                  input4Ref.current.focus();}
                }}
                className='w-[55px] h-[55px] border-[1px] border-black outline-0 rounded-[5px] focus:border-2 text-center text-2xl'
                />
                <input
                id='verify'
                ref={input4Ref}
                maxLength="1"
                type='text'
                value={forthDigit.replace(/\D/g,"")}
                onChange={(e)=>{setForthDigit(e.target.value)}}
                className='w-[55px] h-[55px] border-[1px] border-black outline-0 rounded-[5px] focus:border-2 text-center text-2xl'
                />
            </div>
            <button className=' hover:opacity-85 relative right-2 w-[300px] p-1.5 text-2xl text-white bg-[#042e2e] rounded-[5px] cursor-pointer' type='submit'>أرسل</button>
          </form>
          <p onClick={handleResendcode} className='text-center mt-6 underline text-2xl cursor-pointer relative right-2 h-fit'>أعد إرسال الرمز</p>
          
        </div>
        <img src={background} alt='background' loading='lazy' width='735' height='735' className='hidden larger:block' />
    </div>
  )
}

export default Verifyemail