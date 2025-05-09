import React,{useState,useEffect} from 'react'
import { XIcon } from 'lucide-react';
import { useEditAddressMutation,useGetAddressesQuery } from '@/features/api/apiSlice';
import { setEditStatus, setOpenEdit } from '@/features/checkout/checkout';
import { useSelector,useDispatch } from 'react-redux';
const Editaddress = () => {
    const dispatch =useDispatch();
    const{data:addresses}=useGetAddressesQuery();
    const[editAddress,{data:edit}]=useEditAddressMutation();
      const[latitude,setLatitude]=useState("");
      const[longitude,setLongitude]=useState("");
    const[streetName,setStreetName]=useState(""); 
      const[selectedLocation,setSelectedLocation]=useState("Cairo,Egypt"); 
      const[buildingNumber,setBuildingNumber]=useState("");
      const{location,selectedAddressId,openEdit}=useSelector((state)=>state.checkout) 
      useEffect(()=>{
        if(addresses?.data?.addresses?.length>0){
         const matchedAddress=addresses?.data?.addresses?.find(address=>address.id===selectedAddressId)
         setStreetName(matchedAddress.street_name);
         setBuildingNumber(matchedAddress.building_number);
         setSelectedLocation(matchedAddress.location)

        }
     },[addresses])
        useEffect(()=>{
          const matchedLocation=location.find(location=>location.name===selectedLocation)
          setLatitude(matchedLocation.latitude);
          setLongitude(matchedLocation.longitude);
          
        },[selectedLocation])
      
        useEffect(()=>{
            if(openEdit){
              document.body.classList.add("overflow-hidden");
            }else{
              document.body.classList.remove("overflow-hidden");
            }
            return ()=>{
              document.body.classList.remove("overflow-hidden");
            }
        
          },[openEdit])
        const handleEditAddress=async(e)=>{
            e.preventDefault();
            try {
            const response=await editAddress({addressId:selectedAddressId,addressEdit:{latitude:latitude,
                longitude:longitude,
                location:selectedLocation,
                street_name:streetName,
                building_number:buildingNumber
            }}).unwrap();
            if(response.status){
                dispatch(setOpenEdit(false));
                dispatch(setEditStatus(true));
                setTimeout(()=>{
                    dispatch(setEditStatus(false));
                },3500)
            }
            } catch (e) {
                console.log(e?.data?.errors)
                
            }
        }
  return (
    <div className='w-[97%]  h-[90%] bg-white fixed z-60 top-5 left-[1.5%] right-[1.5%]  mx-auto  shadow-2xl border rounded-[8px] flex flex-col  items-center overflow-y-auto'>
      <button className='cursor-pointer  absolute right-3  top-3' onClick={()=>dispatch(setOpenEdit(false))}><XIcon size={18}/></button>
      <form onSubmit={handleEditAddress} className='w-[92%] flex flex-col items-center gap-10 mt-15'>
          <div className='w-full flex flex-col  gap-1 text-right text-sm'>
          <label htmlFor='location'>الموقع</label>
          <select value={selectedLocation}
           onChange={(e)=>{setSelectedLocation(e.target.value)}}
           className='text-right outline-0 border rounded-sm py-3 px-2 shadow-xs  text-sm focus:border-2 focus:border-[#042e2e]  w-full' id='location' name='location'>
            {location.map(location=>
              <option onClick={()=>{setLatitude(location.latitude);
                setLongitude(location.longitude);
              }} value={location.name} key={location.id}>{location.name}</option>
            )}
          </select>
          </div>
          <div className='w-full flex flex-col gap-1 text-right text-sm'>
            <label htmlFor='streetName'>اسم الشارع</label>
            <input 
            className='w-full text-right outline-0 border rounded-sm px-2 py-3 shadow-xs  text-sm focus:border-2 focus:border-[#042e2e]  '
            required
            id='streetName'
            type='text'
            value={streetName}
            onChange={(e)=>{setStreetName(e.target.value)}}
            />
          </div>
          <div className='w-full flex flex-col gap-1 text-right text-sm'>
            <label htmlFor='buildingNumber'>رقم المبني</label>
            <input 
             className='w-full text-right outline-0 border rounded-sm px-2 py-3 shadow-xs  text-sm focus:border-2 focus:border-[#042e2e] '
            required
            id='buildingNumber'
            type='text'
            value={buildingNumber}
            onChange={(e)=>{setBuildingNumber(e.target.value)}}
            />
          </div>
          <button className='cursor-pointer outline-0 py-4 w-60 text-white bg-[#042e2e] rounded-md'>تعديل العنوان</button>
        </form>

    </div>
  )
}

export default Editaddress