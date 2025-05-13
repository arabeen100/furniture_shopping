import { useEffect, useState } from 'react'
import background from "../../assets/background.webp"
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { setName,setUserName,setPhone,setEmail,setPassword,setErr,clearErr } from '@/features/signup/signupSlice'
import { useRegisterMutation } from '@/features/api/apiSlice'
import { setForgotPassStatus, setSignupStatus } from '@/features/responseStatus/responseStatusSlice'
const Signup = () => {
  const [errors,setErrors]=useState({});
  const [createUser]=useRegisterMutation();
  const{name,userName,phone,email,password,err}=useSelector((state)=>state.signup)
  const[showError,setShowError]=useState(false)
  const dispatch= useDispatch();
  const navigate=useNavigate(); 
  const[passwordType,setPasswordType]=useState('password')
  const phoneRegex = /^(\+?\d{1,4}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?\d{4,10}$/;
  const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
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
     if(err.apiErrors){
      setShowError(true);
      const timer=setTimeout(()=>{
        setShowError(false);
     },3000)
    return ()=>clearTimeout(timer);
     }
    
   },[err])
  useEffect(()=>{
     if (phone&&phoneRegex.test(phone.trim())){
        setErrors({...errors,phoneRegexError:""})
     }else{
      setErrors({...errors,phoneRegexError:"Incorrect number"})
     }
  },[phone])
  useEffect(()=>{
    if (password&&passwordRegex.test(password.trim())){
       setErrors({...errors,passwordRegexError:""})
    }else{
     setErrors({...errors,passwordRegexError:"A strong password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."})
    }
 },[password])
  useEffect(()=>{
    if (Object.keys(errors).length > 0 ) {
      dispatch(setErr(errors))
      return;
    } 
  
  },[errors])
  const handleSubmit =async(e) => {
    e.preventDefault();
    if (!name.trim()){setErrors({...errors,requiredError:  "This field is required"})} ;
    if (!userName.trim() ){
      setErrors({...errors,requiredError:  "This field is required"});
    }
    if (!phone.trim()) {
      setErrors({...errors,requiredError:  "This field is required"});
    }
    if (!email.trim()) setErrors({...errors,requiredError:  "This field is required"});
    if (!password.trim()) {setErrors({...errors,requiredError:  "This field is required"});}

    const formData=new FormData();
    formData.append("email", email);
    formData.append("username",userName);
    formData.append("name",name)
    formData.append("phone",phone);
    formData.append("password",password);
    try{
    const response=await createUser(formData).unwrap();
    dispatch(setSignupStatus(response.status));
    dispatch(setForgotPassStatus(false))
    dispatch(clearErr());
    if(response.status){
    navigate("/auth/verifyemail");
    dispatch(setSignupStatus(response.status));
    }
    }catch(e){
      if(e?.data?.errors && Array.isArray(e.data.errors)){
        setErrors({...errors,apiErrors:e.data.errors})
      }else{
        errors.general=e?.error||"An unknown error occured"
      }
    }
 
 
    
   
  };

 
  
  
 
  return (
    <main className='w-full larger:flex larger:items-start'>
     <div className={` fixed top-[23px] left-[50%] -translate-x-[50%] larger:left-[50%] larger:-translate-x-[50%] h-[300px] transition-all duration-400 ${showError?"translate-y-0":"-translate-y-[300px]"}`}>
      {err?.apiErrors?.[0]&&!err?.requiredError&&<p className={`bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>{err.apiErrors[0]} ❌</p>}
      {err?.apiErrors?.[1]&&!err?.requiredError&&<p className={`bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>{err.apiErrors[1]} ❌</p>}
      {err?.apiErrors?.[2]&&!err?.requiredError&&<p className={`bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>{err.apiErrors[2]} ❌</p>}
      </div>
   
    <section className='flex justify-center items-center larger:w-[50%] p-5'>
    <form onSubmit={handleSubmit} className='mt-13 flex flex-col gap-5 w-[325px] text-right'>
      <h2 className='text-center text-2xl'>أنشئ حسابك</h2>
      <div className='flex flex-col'>
      <label htmlFor='name'>الاسم</label>
      <input className={` border-[.5px]  ${(err?.requiredError&&!name.trim())&&"border-red-500 border-[1px] focus:border-[#042e2e] focus:border-2"} text-right text-black text-sm w-[325px] h-[45px] p-1 outline-0 focus:border-2 focus:border-[#042e2e] rounded-sm`}
      id='name'
      type='text'
      placeholder='Type your name'
      value={name}
      onChange={(e)=>{dispatch(setName(e.target.value))}}
      />
      {(err?.requiredError&& !name.trim() )&& <p className="text-red-500 text-xs text-right">{err.requiredError}</p>}
      </div>
      <div className='flex flex-col'>
      <label htmlFor='userName'>اسم المستخدم</label>
      <input className={` border-[.5px]  ${(err?.requiredError&&!userName.trim())&&"border-red-500 border-[1px] focus:border-[#042e2e] focus:border-2"} text-right text-sm w-[325px] h-[45px] p-1 outline-0 focus:border-2 focus:border-[#042e2e] rounded-sm `}
      id='userName'
      type='text'
      
       value={userName}
      onChange={(e)=>{dispatch(setUserName(e.target.value))}}
      placeholder='Type your username'
      />
       {(err?.requiredError&& !userName.trim() )&& <p className="text-red-500 text-xs text-right">{err.requiredError}</p>}
      </div>
      <div className='flex flex-col'>
      <label htmlFor='phone'>رقم الهاتف</label>
      <input className={` border-[.5px]  ${((err?.requiredError&&!phone.trim()||(err?.phoneRegexError&&phone.trim())))&&"border-red-500 border-[1px] focus:border-[#042e2e] focus:border-2"} text-right text-sm w-[325px] h-[45px] p-1 outline-0 focus:border-2 focus:border-[#042e2e] rounded-sm `}
      id='phone'
      type='tel'
      value={phone}
      onChange={(e)=>{dispatch(setPhone(e.target.value))}}
      placeholder='Type your phone'
      />
       {(err?.requiredError&& !phone.trim() )&& <p className="text-red-500 text-xs text-right">{err.requiredError}</p>}
       {(err?.phoneRegexError&&phone)&&  <p className="text-red-500 text-xs text-right">{err.phoneRegexError}</p>}
      </div>
      <div className='flex flex-col'>
      <label htmlFor='email'>البريد الإلكتروني </label>
      <input className={` border-[.5px] ${(err?.requiredError&&!email.trim())&&"border-red-500 border-[1px] focus:border-[#042e2e] focus:border-2"} text-right text-sm w-[325px] h-[45px] p-1 outline-0 focus:border-2 focus:border-[#042e2e] rounded-sm `}
      id='email'
      type='email'
      
       value={email}
      onChange={(e)=>{dispatch(setEmail(e.target.value))}}
      placeholder='Type your email'
      />
      {(err?.requiredError&& !email.trim() )&& <p className="text-red-500 text-xs text-right">{err.requiredError}</p>}
      </div>
      <div className='flex flex-col'>
      <label htmlFor='password'>كلمة المرور </label>
      <div className='relative'>
      <input className={` border-[.5px] text-right text-sm w-[325px] h-[45px] p-1 outline-0 ${(err?.requiredError&&!password.trim())&&"border-red-500 border-[1px] focus:border-[#042e2e] focus:border-2"} focus:border-[#042e2e] border-2 rounded-sm `}
      id='password'
      type={passwordType}
      value={password}  
      onChange={(e)=>{dispatch(setPassword(e.target.value))}}
      placeholder='Type your password'
      />
           <p className={` absolute left-3 top-2 w-fit cursor-pointer `} onClick={()=>{
        if(passwordType==="password"){setPasswordType("text")}else if(passwordType==="text"){
          setPasswordType("password")
        }
      }}>👁</p>
      </div>
      {(err?.requiredError&& !password.trim() )&& <p className="text-red-500 text-xs text-right">{err.requiredError}</p>}
      {(err?.passwordRegexError&&password)&&  <p className="text-red-500 text-xs text-right">{err.passwordRegexError}</p>}
      </div>
 
      
      <button 
        type='submit' className='w-[325px] h-[40px] grid place-content-center border bg-[#042e2e] text-white text-sm rounded-lg cursor-pointer hover:opacity-85' >
            أكمل مع البريد الإلكتروني
      </button>
    </form>
   
    </section>
    <img src={background} alt='background' loading='lazy'  className='hidden larger:block w-[50%] h-screen' />
    </main>
  
  )
}

export default Signup