import React, { useEffect } from 'react'
import { useGetCarouselsQuery } from '@/features/api/apiSlice'

const Home = () => {
  const {data:carousals,isLoading,error}=useGetCarouselsQuery();

  useEffect(()=>{
      if(carousals){
        console.log(carousals)
      }
  },[carousals])
  return (
    <div></div>
  )
}

export default Home