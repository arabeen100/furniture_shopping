import { Closeicon } from '@/icons'
import { useSelector,useDispatch } from 'react-redux'
import { closeSearch } from '@/features/search/searchSlice'
import { setSearch } from '@/features/search/searchSlice'
const Search = () => {
  var {searchInput}=useSelector((state)=> state.search);
  const dispatch=useDispatch();
  return ( 
    <form className='w-[95%] sm:w-[98%] h-[90%] fixed z-10 top-5 left-[2.5%] sm:left-[1%] bg-white mx-auto flex flex-col gap-10 rounded-[8px]' onSubmit={(e)=>e.preventDefault()}>
       <button className='cursor-pointer  relative left-[93%] sm:left-[96%] top-5' onClick={()=>dispatch(closeSearch())}><Closeicon/></button>
       <div className=' flex w-full '>
       <button className=' bg-[#042e2e] h-15 w-20 rounded-tl-[10px] rounded-bl-[10px] text-white ml-2.5 sm:ml-5 cursor-pointer'>
        <label htmlFor='search'>بحث</label>
       </button>
       <input className=' w-[78%] sm:w-[90%] h-15 border-[#042e2e] border-2 rounded-br-[10px] rounded-tr-[10px] outline-0 text-xl'
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
  
  )
}

export default Search