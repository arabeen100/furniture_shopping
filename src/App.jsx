
import { useEffect } from "react";
import { useGetCarouselsQuery } from "./features/api/apiSlice"

function App() {
  const{data:carousels,error,isLoading}=useGetCarouselsQuery();
  useEffect(()=>{
  if(carousels){
     console.log(carousels)}
},[carousels])
  return (
     <h1> hello!</h1>
  )
}

export default App
