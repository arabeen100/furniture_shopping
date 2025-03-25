import React from 'react'
import { useEffect,useState } from 'react'
import background from "../../assets/background.webp"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLogInMutation } from '@/features/api/apiSlice'
import { setItem, setToken } from '@/features/login/login'
import { setName,setUsername,setEmail,setPhone } from '@/features/userData/userDataSlice'
const Login = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [loginUser,{isError}]=useLogInMutation();
  const[userIdentifier,setUserIdentifier]=useState("");
  const[passwordType,setPasswordType]=useState('password')
  const[password,setPassword]=useState("")
  const[showError,setShowError]=useState(false);
  const[userError,setUserError]=useState("")
  const[passwordError,setPasswordError]=useState("")

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
       setShowError(true);
       const timer=setTimeout(()=>{
         setShowError(false);
      },3000)
     return ()=>clearTimeout(timer);
      }
},[isError])



     const handleSubmit=async(e)=>{
          e.preventDefault();
          if(!userIdentifier){setUserError("This field is required")}
          if(!password){setPasswordError('This field is required')}
          const formData = new FormData();
          formData.append('user_identifier', userIdentifier);
          formData.append('password', password);
          try{const response=await loginUser(formData).unwrap();
           /*  dispatch(setName(response.data.name));
            dispatch(setUsername(response.data.username));
            dispatch(setEmail(response.data.email));
            dispatch(setPhone(response.data.phone)); */
            localStorage.setItem("user",JSON.stringify(response.data.user))
            if(response.status){
              dispatch(setToken(response.data.token))
              dispatch(setItem());
          }
          navigate("/")
          }catch(e){console.log(e.data.errors)};
      
     }
  return (
    <div className='larger:flex larger:items-start'>

      {(isError&&password&&userIdentifier)&&<p className={` fixed top-[23px] left-[50%] -translate-x-[50%] transition-all duration-400 ${showError?"translate-y-0":"-translate-y-[150px]"} bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}> Login failed: wrong email or password ❌</p>}
      <div className=' w-full h-[100vh] grid place-content-center   larger:w-[50%]'>
      
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-[325px] text-right'>
          <p className='text-center text-2xl'>تسجيل الدخول</p>
          <div>
          <label htmlFor='email'>البريد الإلكتروني</label>
          <input
          id="email"
          type='text'
          placeholder='Type your email'
          value={userIdentifier}
          onChange={(e)=>{setUserIdentifier(e.target.value)}} 
           className={` border-[.5px] ${(userError&&!userIdentifier.trim())&&"border-red-500 border-[1px] focus:border-[#042e2e] focus:border-2"} text-right text-sm w-[325px] h-[45px] p-1 outline-0 focus:border-2 focus:border-[#042e2e] rounded-sm`}/>
            {(userError&&!userIdentifier) &&<p className="text-red-500 text-xs text-right">{userError}</p>}
          </div>
          <div>
          <label htmlFor='password'>كلمة المرور</label>
          <div className='flex relative'>
          <input 
          id='password'
          type={passwordType}
          placeholder='Type your password'
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
          className={` border-[.5px] ${(passwordError&&!password.trim())&&"border-red-500 border-[1px] focus:border-[#042e2e] focus:border-2"} text-right text-sm w-[325px] h-[45px] p-1 outline-0 focus:border-2 focus:border-[#042e2e] rounded-sm`}/>
              <p className={`absolute left-3 top-2 w-fit cursor-pointer `} onClick={()=>{
            if(passwordType==="password"){setPasswordType("text")}else if(passwordType==="text"){
              setPasswordType("password")
            }
          }}>👁</p>
          </div>
          {(passwordError&&!password) &&<p className="text-red-500 text-xs text-right">{passwordError}</p>}
          </div>
          <button  type='submit' className='w-[325px] h-[40px] grid place-content-center border bg-[#042e2e] text-white text-sm rounded-lg cursor-pointer hover:opacity-85'>تسجيل الدخول</button>
          <p onClick={()=>{navigate("/auth/forgotpass")}} className='text-center hover:opacity-85 cursor-pointer text-sm'>نسيت كلمة المرور</p>
        </form>
       
      </div>
      <img src={background} alt='background' loading='lazy' width='735' height='735' className='hidden larger:block' />
        
    </div>
  )
}

export default Login