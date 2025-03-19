import React from 'react'
import { useEffect,useState } from 'react'
import background from "../../assets/background.webp"
import { useNavigate } from 'react-router-dom'
import { useResetPasswoedMutation } from '@/features/api/apiSlice'
import { useSelector } from 'react-redux'
const Resetpassword = () =>{
  const navigate=useNavigate();
  
  const [resetPassword,{isError,isSuccess}]=useResetPasswoedMutation();
  const[password,setPassword]=useState("");
  const[confirmPassword,setConfirmPassword]=useState("");
  const[passwordType,setPasswordType]=useState('password')
  const[showError,setShowError]=useState(false);
  const[confirmPasswordError,setConfirmPasswordError]=useState("");
  const[confirmingError,setConfirmingError]=useState("");
  const[confirmpasswordType,setConfirmPasswordType]=useState('password');
  const[passwordError,setPasswordError]=useState("");
  const[successMessage,setSuccessMessage]=useState("");
  const{userEmail}=useSelector((state)=>state.forgotPass);
  const{resetPass}=useSelector((state)=>state.verifyCode);
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
      if(isError||isSuccess){
       setShowError(true);
       const timer=setTimeout(()=>{
         setShowError(false);
      },3000)
     return ()=>clearTimeout(timer);
      }
},[isError,isSuccess])
useEffect(()=>{
  if(confirmPassword===password){
    setConfirmingError("");
  }
},[password,confirmPassword])



     const handleSubmit=async(e)=>{
          e.preventDefault();
          if(!confirmPassword){setConfirmPasswordError("This field is required")}
          if(!password){setPasswordError('This field is required')}
          if(confirmPassword!==password){
            setConfirmingError("Password need to match")
          }
          const formData = new FormData();
          formData.append("email",userEmail);
          formData.append("resetPasswordCode",resetPass);
          formData.append("password",password);
          try{const response=await resetPassword(formData).unwrap();
            setSuccessMessage(response.data.message);
            if(response.status){
              setTimeout(()=>{  navigate("/auth/login")},4000)
          }
          }catch(e){console.log(e.data.errors);
          };
      
     }
  return (
    <div className='larger:flex larger:items-start'>
     <div className={`fixed top-[23px] left-[50%] -translate-x-[50%] transition-all duration-400 ${showError?"translate-y-0":"-translate-y-[250px]"}`}>
      {(isError&&password&&confirmPassword&&!confirmingError)&&<p className={`bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}> Reset password code isn't correct ❌</p>}
      {(isSuccess&&password&&confirmPassword&&!confirmingError)&&<p className={`bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>{successMessage} ✔️</p>}
     </div>
      <div className=' w-full h-[calc(100vh-85px)] grid place-content-center   larger:w-[50%]'>
      
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-[325px] text-right'>
          <p className='text-center text-2xl'>أعد ضبط كلمة  المرور</p>
          <div>
          <label htmlFor='password'>كلمة المرور</label>
          <div className='flex relative'>
          <input
          id="password"
          type={passwordType}
          placeholder='Add password'
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}} 
           className={`${(passwordError&&!password.trim())&&"border-red-500 border-[1px] focus:border-[#042e2e] focus:border-2"} text-right text-sm w-[325px] h-[45px] p-1 outline-1 focus:border-2 focus:border-[#042e2e] rounded-sm`}/>
                <p className={`absolute left-3 top-2 w-fit cursor-pointer `} onClick={()=>{
            if(passwordType==="password"){setPasswordType("text")}else if(passwordType==="text"){
              setPasswordType("password")
            }
          }}>👁</p>
          </div>
            {(passwordError&&!password) &&<p className="text-red-500 text-xs text-right">{passwordError}</p>}
          </div>
          <div>
          <label htmlFor='confirmPassword'>تأكيد كلمة المرور</label>
          <div className='flex relative'>
          <input 
          id='confirmPassword'
          type={confirmpasswordType}
          placeholder='Confirm password'
          value={confirmPassword}
          onChange={(e)=>{setConfirmPassword(e.target.value)}}
          className={`${(confirmPasswordError&&!confirmPassword.trim())&&"border-red-500 border-[1px] focus:border-[#042e2e] focus:border-2"} text-right text-sm w-[325px] h-[45px] p-1 outline-1 focus:border-2 focus:border-[#042e2e] rounded-sm`}/>
              <p className={`absolute left-3 top-2 w-fit cursor-pointer `} onClick={()=>{
            if(confirmpasswordType==="password"){setConfirmPasswordType("text")}else if(confirmpasswordType==="text"){
              setConfirmPasswordType("password")
            }
          }}>👁</p>
          </div>
          {(confirmPasswordError&&!confirmPassword) &&<p className="text-red-500 text-xs text-right">{confirmPasswordError}</p>}
          {(confirmingError&&password&&confirmPassword) &&<p className="text-red-500 text-xs text-right">{confirmingError}</p>}
          </div>
          <button  type='submit' className='w-[325px] h-[40px] grid place-content-center border bg-[#042e2e] text-white text-sm rounded-lg cursor-pointer hover:opacity-85'>تحديث كلمة المرور</button>
        </form>
      </div>
      <img src={background} alt='background' loading='lazy' width='735' height='735' className='hidden larger:block' />
    </div>
  )
}

export default Resetpassword