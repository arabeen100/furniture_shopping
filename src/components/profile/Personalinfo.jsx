import React, { useEffect, useState } from 'react'
import Profilecard from './Profilecard'
import { Updateicon } from '@/icons'
import { useGetProfileQuery,useGetAddressesQuery,useUpdateInfoMutation } from '@/features/api/apiSlice'
import { setProfileClicked, setUserOrdersClicked, setWishlistClicked } from '@/features/sidebar/sidebarSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setToken,setItem } from '@/features/login/login'
const Personalinfo = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const[errors,setErrors]=useState('')
  const[showError,setShowError]=useState(false)  
  const[passwordType,setPasswordType]=useState("password")
  const[firstName,setFirstName]=useState("")
  const[secondName,setSecondName]=useState("")
  const[phone,setPhone]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const{data:userInfo}=useGetProfileQuery();
  const{data:addresses}=useGetAddressesQuery();
  const[updatedUser,{data:updata,isError,isSuccess}]=useUpdateInfoMutation();
  useEffect(()=>{
    if(userInfo){
      console.log(userInfo);
      setFirstName(userInfo.data.user.name.split(" ")[0]);
      setSecondName(userInfo.data.user.name.split(" ")[1]);
      setPhone(userInfo.data.user.phone);
      setEmail(userInfo.data.user.email);
    }else{
      dispatch(setToken(""));
      dispatch(setItem());
      navigate("/auth/login");
    }
  },[userInfo])
    useEffect(()=>{
       if(errors || isSuccess){
        setShowError(true);
        const timer=setTimeout(()=>{
          setShowError(false);
       },3000)
      return ()=>clearTimeout(timer);
       }
      
     },[errors,isSuccess])

  useEffect(()=>{
    if(addresses){
      console.log(addresses);
    }
  },[addresses])
  useEffect(()=>{
      dispatch(setProfileClicked(true));
      dispatch(setUserOrdersClicked(false));
      dispatch(setWishlistClicked(false))
  },[])
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("name", `${firstName} ${secondName}`);
    formData.append("email",email);
    formData.append('username',userInfo?.data.user.username)
    formData.append("password",password);
    formData.append("phone",phone);
    try {
      const response= await updatedUser(formData).unwrap();
    } catch (e) {
      console.log(e?.data?.errors);
      setErrors(e.data.errors);

      
    }

  }


  return (
    <div className='w-full flex small:w-fit px-3 mx-auto   '>
      <div className=' w-full justify-center   flex-grow  mt-9 flex flex-col items-end '>
         <div className={` fixed top-[23px] left-[50%] -translate-x-[50%] transition-all duration-400 ${showError?"translate-y-0":"-translate-y-[300px]"}`}>
         {(isSuccess)&&<p className={`bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>{updata?.data.message} ✔️</p>}
         {isError&&errors?.[0]&&<p className={`bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>{errors[0]} ❌</p>}
         {isError&&errors?.[1]&&<p className={`bg-[#298d8dfd] p-5 rounded-[8px] w-fit mx-auto mb-2 text-white`}>{errors[1]} ❌</p>}
         </div>

        <p className='text-right text-4xl text-[#042e2e] mr-5 mb-9 '>ملفي الشخصي</p> 
        <div className='w-full larger:flex larger:flex-row-reverse flex-col   larger:items-baseline'>
        <Profilecard name={(updata?.data.user.name)||(userInfo?.data.user.name)}/>
        <div className='flex flex-col items-end'>
        <form onSubmit={handleSubmit} className='flex flex-col text-right text-sm items-end  mt-5 mb-8 gap-10'>
          <button className='flex cursor-pointer text-white bg-[#5bb3ae]  p-4 rounded-lg text-[15px] w-[170px] justify-center items-center gap-2'>تحديث <Updateicon/></button>
          <div className='flex flex-col gap-6 '>
            <div className='flex gap-4 flex-row-reverse'>
            <div className='flex flex-col'  >
            <label htmlFor='firstName'>الاسم الاول</label>
            <input
            className=" p-3 max-[459px]:w-[160px] w-[180px] larger:w-[200px] large:w-[300px] xlarge:w-[400px]  h-[52px] border rounded-lg focus:border-3 focus:border-[#44bdad] text-right "
            id='firstName'
            value={firstName}
             type="text" 
             onChange={(e)=>{setFirstName(e.target.value)}}
            />
            </div>
            <div className='flex flex-col '  >
            <label htmlFor='secondName'>الاسم الثاني</label>
            <input
            className=" p-3 max-[459px]:w-[160px] w-[180px] larger:w-[200px] large:w-[300px] xlarge:w-[400px]  h-[52px] border rounded-lg focus:border-3 focus:border-[#44bdad]  text-right "
             id='secondName'
             value={secondName}
             onChange={(e)=>{setSecondName(e.target.value)}}
             type="text" />
             </div>
             </div>
             <div className='flex flex-row-reverse gap-4'>
             <div className='flex flex-col'>
            <label htmlFor='phone'>رقم الهاتف</label>
            <input
            className=" p-3 max-[459px]:w-[160px] w-[180px] larger:w-[200px] large:w-[300px] xlarge:w-[400px]  h-[52px] border rounded-lg focus:border-3 focus:border-[#44bdad]  text-right " 
              id='phone'
              value={phone}
              onChange={(e)=>{setPhone(e.target.value)}}
            type="tel" />
            </div>
            <div className='flex flex-col'  >  
            <label htmlFor='email'>البريد الإلكتروني</label>
            <input
            className=" p-3 max-[459px]:w-[160px] w-[180px] larger:w-[200px] large:w-[300px] xlarge:w-[400px]  h-[52px] border rounded-lg focus:border-3 focus:border-[#44bdad]  text-right "
             id='email'
             value={email}
             onChange={(e)=>{setEmail(e.target.value)}} 
            type="email" />
            </div>
            </div>
            <div className='flex flex-col'  >
            <label htmlFor='password'> كلمة المرور</label>
            <div className='relative flex'>
            <input
            className=" p-3 max-[459px]:w-[350px] w-[370px] larger:w-[415px] large:w-[615px] xlarge:w-[815px] larger:ml-12 ml-8 h-[52px] border rounded-lg focus:border-3 focus:border-[#44bdad]  text-right "
             id='password'
             value={password}
             onChange={(e)=>{setPassword(e.target.value)}} 
            type={passwordType} />
            <p className={`absolute left-11 top-3 larger:left-15 w-fit cursor-pointer `} onClick={()=>{
            if(passwordType==="password"){setPasswordType("text")}else if(passwordType==="text"){
              setPasswordType("password")
            }
          }}>👁</p>
            </div>
            </div>
          </div>
        </form>
        {addresses?.data.addresses?(addresses?.data.addresses.map((address,index)=>
          <div className=' w-[370px] text-right border rounded-sm flex flex-col gap-2 mr-1 p-2 mb-15 larger:w-[415px] large:w-[615px] xlarge:w-[815px] max-[459px]:w-[350px]' key={address.id}  >
          <p className='text-xs'> {index+1}العنوان</p>
          <p>{address.street_name}:اسم الشارع</p>
          <p>{address.building_number}:رقم المبني</p>
          <p >الموقع: خط العرض: {address.latitude}, خط الطول: {address.longitude}</p>            
          </div>)):<p className='mr-1 mb-15 text-right '>لا يووجد اى عناوين</p>
        }
        </div>
        </div>
    

      </div>
    </div>
  )
}

export default Personalinfo