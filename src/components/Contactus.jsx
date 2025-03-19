import React from 'react'
import { useEffect,useState } from 'react'
import { useContactMutation } from '@/features/api/apiSlice'
const Contactus = () =>{  
  const [contact,{isSuccess}]=useContactMutation();
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[phone,setPhone]=useState("");
  const[message,setMessage]=useState("");
  const[showError,setShowError]=useState(false);
  const[nameError,setNameError]=useState("");
  const[emailError,setEmailError]=useState("");
  const[phoneError,setPhoneError]=useState("");
  const[messageError,setMessageError]=useState("");
  const[successMessage,setSuccessMessage]=useState("");
 useEffect(()=>{
      if(isSuccess){
       setShowError(true);
       const timer=setTimeout(()=>{
         setShowError(false);
      },3000)
     return ()=>clearTimeout(timer);
      }
},[isSuccess])
     const handleSubmit=async(e)=>{
          e.preventDefault();
          if(!name){setNameError("This field is required")}
          if(!email){setEmailError('This field is required')}
          if(!phone){setPhoneError('This field is required')}
          if(!message){setMessageError('This field is required')}

          const formData = new FormData();
          formData.append("name",name);
          formData.append("email",email);
          formData.append("phone",phone);
          formData.append("message",message);
          try{const response=await contact(formData).unwrap();
            setSuccessMessage(response.data.message);
          }catch(e){console.log(e.data.errors);
          };
      
     }
  return (
    <div className='w-full h-145 only-667 '>
      {(isSuccess)&&<p className={` fixed top-[23px] left-[50%] -translate-x-[50%] transition-all duration-400 ${showError?"translate-y-0":"-translate-y-[150px]"} bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>{successMessage} ✔️</p>}
      <div className='h-[calc(100vh-85px)]  grid place-content-center'>
      
        <form onSubmit={handleSubmit} className='flex flex-col w-[365px] sm:w-[450px] gap-5 text-right'>
          <p className='text-center text-4xl mb-15'>اتصل بنا</p>
          <div >
          <label htmlFor='name' className='hidden'>name</label>
          <input
          id="name"
          type='text'
          placeholder='*الأسم '
          value={name}
          onChange={(e)=>{setName(e.target.value)}} 
           className={`${(nameError&&!name.trim())&&"border-red-500 border-[1px] focus:border-[#042e2e] focus:border-2"} text-right text-sm w-full h-[50px] p-1 outline-1 focus:border-2 focus:border-[#042e2e] rounded-sm`}/>
            {(nameError&&!name) &&<p className="text-red-500 text-xs text-right">{nameError}</p>}
          </div>
          <div >
          <label htmlFor='email' className='hidden'>email</label>
          <input
          id="email"
          type='email'
          placeholder='*البريد الألكترونى'
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}} 
           className={`${(emailError&&!email.trim())&&"border-red-500 border-[1px] focus:border-[#042e2e] focus:border-2"} text-right text-sm w-full h-[50px] p-1 outline-1 focus:border-2 focus:border-[#042e2e] rounded-sm`}/>
            {(emailError&&!email) &&<p className="text-red-500 text-xs text-right">{emailError}</p>}
          </div>
          <div >
          <label htmlFor='phone' className='hidden'>phone</label>
          <input
          id="phone"
          type='text'
          placeholder='*رقم الهاتف'
          value={phone}
          onChange={(e)=>{setPhone(e.target.value)}} 
           className={`${(phoneError&&!phone.trim())&&"border-red-500 border-[1px] focus:border-[#042e2e] focus:border-2"} text-right text-sm w-full h-[50px] p-1 outline-1 focus:border-2 focus:border-[#042e2e] rounded-sm`}/>
            {(phoneError&&!phone) &&<p className="text-red-500 text-xs text-right">{phoneError}</p>}
          </div>
          <div >
          <label htmlFor='message'className='hidden'>message</label>
          <textarea
          id="message"
          type='text'
          placeholder='رسالة'
          value={message}
          onChange={(e)=>{setMessage(e.target.value)}} 
           className={`${(messageError&&!message.trim())&&"border-red-500 border-[1px] focus:border-[#042e2e] focus:border-2"} text-right  w-full h-[85px] p-1 resize-none outline-1 focus:border-2 focus:border-[#042e2e] rounded-sm`}/>
            {(messageError&&!message) &&<p className="text-red-500 text-xs text-right">{messageError}</p>}
          </div>
          <button  type='submit' className='w-full h-[55px] grid place-content-center border bg-[#042e2e] text-white text-sm rounded-lg cursor-pointer hover:opacity-85 '>ارسل</button>
        </form>
      </div>
    </div>
  )
}

export default Contactus