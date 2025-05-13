import React from 'react'
import { useGetFaqsQuery } from '@/features/api/apiSlice'
import { useEffect,useState } from 'react';
import { ChevronDownicon } from '@/icons';
const Faqs = () => {
  const {data:FAQs,isSuccess}=useGetFaqsQuery();
  const[chevronClicked1,setChevronClicked1]=useState(false);
  const[chevronClicked2,setChevronClicked2]=useState(false);
  return (
    <main className='flex flex-col justify-center items-center gap-10'>
      <h1 className='text-center text-4xl mt-20'>أسئلة متكررة</h1>
      <div >
        
        <div className={`flex justify-around  shadow-sm h-fit w-fit rounded-lg ${chevronClicked1&&' border-2 border-[#5bb3ae]' }  gap-30 small:gap-80 larger:gap-130 xlarge:gap:160 p-6`}>
         {isSuccess&& <div  className={`${chevronClicked1&&"-rotate-90 "} transition-all duration-300 w-fit h-fit  cursor-pointer`} onClick={()=>{setChevronClicked1(!chevronClicked1)}}><ChevronDownicon/></div>}
          <div className={`  flex flex-col gap-5`}>
          {isSuccess&&<p className='font-semibold text-sm small:text-xl text-right'>{FAQs.data.faqs[0].question_ar}</p> }
          {isSuccess&&<p className={`  text-lg text-gray-500 text-right transition-all duration-300 overflow-hidden ${chevronClicked1?"max-h-40 opacity-100":"max-h-0 opacity-0"}`} >{FAQs.data.faqs[0].answer_ar}</p> } 
          </div>
        </div>
      </div>
      <div className='mb-20'>
        <div className={`flex justify-around  shadow-sm h-fit w-fit rounded-lg ${chevronClicked2&&'border-2 border-[#5bb3ae]'} gap-30 small:gap-80 larger:gap-130 xlarge:gap:160 p-6`}>
        {isSuccess&& <div className={`${chevronClicked2&&"-rotate-90"} w-fit h-fit cursor-pointer`} onClick={()=>{setChevronClicked2(!chevronClicked2)}}><ChevronDownicon/></div>}
          <div className='flex flex-col gap-5'>
          {isSuccess&&<p className=' font-semibold small:text-xl  text-sm text-right'> {FAQs.data.faqs[1].question_ar}</p> }
          {isSuccess&&<p  className={` text-lg text-gray-500 text-right transition-all duration-300 overflow-hidden  ${chevronClicked2?"max-h-40 opacity-100":"max-h-0 opacity-0"}`} >{FAQs.data.faqs[1].answer_ar}</p> } 
          </div>
        </div>
      </div>
    </main>
  )
}

export default Faqs