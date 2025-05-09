import { Closeicon } from '@/icons'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { closeSearch } from '@/features/search/searchSlice'
import { setSearch } from '@/features/search/searchSlice'
const Search = () => {
  const {searchInput}=useSelector((state)=> state.search);
  const {isOpen}=useSelector((state)=>state.search)
  const dispatch=useDispatch();
  useEffect(()=>{
    if(isOpen){
      document.body.classList.add("overflow-hidden");
    }else{
      document.body.classList.remove("overflow-hidden");
    }
    return ()=>{
      document.body.classList.remove("overflow-hidden");
    }

  },[isOpen])

  return ( 
    <div className='w-[95%] sm:w-[98%] h-[90%] bg-white fixed z-60 top-5 left-[2.5%] sm:left-[1%] mx-auto shadow-2xl rounded-[8px] overflow-y-auto'>
    <form className=' w-full flex flex-col gap-10  ' onSubmit={(e)=>e.preventDefault()}>
       <button className='cursor-pointer  relative left-[90%] sm:left-[96%] top-5' onClick={()=>dispatch(closeSearch())}><Closeicon/></button>
       <div className=' w-full flex justify-center '>
       <button className=' bg-[#042e2e] h-15 w-fit p-7 grid place-content-center rounded-tl-[10px] rounded-bl-[10px] text-white  cursor-pointer'>
        <label htmlFor='search'>بحث</label>
       </button>
       <input className=' w-[70%] sm:w-[90%] h-15 border-[#042e2e] border-2 rounded-br-[10px] rounded-tr-[10px] outline-0 text-xl'
       id='search'
       value={searchInput}
       role='searchBox'
       type='text'
       onChange={(e)=>dispatch(setSearch(e.target.value))}
       />
      </div>  
      <p className=' text-2xl font-bold text-center '>لم يتم العثور على أي منتجات</p>
      <p className='text-2xl font-bold text-center text-[#044949] relative top-40'>loading</p>
    </form>
    </div>
  
  )
}

export default Search