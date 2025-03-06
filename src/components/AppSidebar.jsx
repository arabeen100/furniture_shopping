import { Link } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { Closeicon } from "@/icons"
import { setExpanded } from "@/features/sidebar/sidebarSlice"
import { ifNotRegister } from "@/features/register/registerSlice"
import profileLogo from "../assets/profile.webp"
export function AppSidebar() {
      const dispatch=useDispatch();
      const {expanded} =useSelector((state)=>state.sidebar)
      const {registered}=useSelector((state)=>state.register)
      return (
         <div className={`${expanded&&"w-full h-full bg-[#00000070] fixed z-20"}`}>
          <aside  onClick={(e)=>e.stopPropagation()} className={`h-screen bg-white  transition-all overflow-hidden duration-300  fixed left-0  z-30 w-[300px] ${expanded ? " translate-x-0" : " -translate-x-full"}`}>
            
              <button  onClick={()=>{dispatch(setExpanded())}} className=" relative cursor-pointer top-10 left-5">
                <Closeicon/>
              </button>
              <ul className=" text-right leading-10 mr-5 flex flex-col justify-end ">
                <li>فئات</li>
                <li><Link to='/categories/غرف النوم'>غرف النوم</Link></li>
                <li><Link to='/categories/مجالس'>مجالس</Link></li>
                <li><Link to='/categories/مجامر'>مجامر</Link></li>
                <li><Link to='/categories/ستائر'>ستائر</Link></li>
                <li><Link to='/categories/any'>any</Link></li>
                <li><Link to='profile/Personalinfo' className={`${!registered&& " hidden"} md:hidden relative top-2 left-64 w-[38px] h-[38px]`} ><img src={profileLogo} width='25' alt="profile-logo"loading="lazy"/></Link></li>
                <li ><Link onClick={()=>{dispatch(ifNotRegister())}} to='/auth/login' className={`${!registered&& " hidden"} w-[60px] h-[40px] bg-white outline-0  \cursor-pointer                border  text-sm border-black grid place-content-center relative top-6 left-56 `}>logout</Link ></li>
              </ul>
              <ul className={`${!registered?" inline-flex gap-3":"hidden"} relative left-13 top-9`}>
                <li><Link to="/auth/login" className={`w-[140px] h-[30px]outline-none p-1 rounded-[5px] bg-white border border-black grid  place-content-center `}>تسجيل الدخول</Link></li>
                <li><Link to="/auth/signup"className={` w-[80px] h-[30px]outline-none p-1 rounded-[5px] bg-white border border-black grid  place-content-center `}>تسجيل</Link></li>
              </ul>
          </aside>
        </div>
      )
    }

