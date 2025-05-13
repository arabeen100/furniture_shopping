import footerLogo from "../assets/footer-logo.svg"
import facebookLogo from "../assets/facebook.svg"
import instagramLogo from "../assets/instagram.svg"
import twitterLogo from "../assets/twitter.svg"
import youtubeLogo from "../assets/youtube.svg"
import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    < footer>
    <div className=" flex flex-col  justify-around items-end   w-[98%] py-3 small:py-5 larger:py-20   gap-7   small:justify-around small:flex-row-reverse small:items-start  small:flex-wrap  larger:flex-nowrap ">
    <Link to="/" className=' mb-2'><img  src={footerLogo} alt='Al-Rahman_logo' loading='lazy' />
    </Link> 
    <div className='flex flex-col gap-4 text-white  text-right text-lg pr-3.5 ' >
        <p>فئات</p>
        <Link  className=' categories' to={`/categories/غرف النوم`}>غرف النوم</Link>
        <Link className='categories' to={`/categories/مجالس`} >مجالس</Link>
        <Link className=' categories' to={`/categories/مجامر`}>مجامر</Link>
        <Link className=' categories' to={`/categories/ستائر`}>ستائر</Link>
        <Link className=' categories' to={`/categories/any`}>any</Link>
      </div> 
      <div className='flex flex-col gap-4 text-white text-right  text-lg pr-3.5' >
      <p >وسائل التواصل الاجتماعي</p>
      <div className='flex justify-around'>
         <a href=''> <img src={youtubeLogo} alt='youtube_logo'loading='lazy'/>
         </a>
         <a href=''>
          <img src={twitterLogo}alt='twitter_logo'loading='lazy'/>
         </a>
          <a href=''>
          <img src={instagramLogo}alt='instagram_logo'loading='lazy'/>
         </a>

         <a href=''>
          <img src={facebookLogo}alt='facebook_logo'loading='lazy'/>
         </a>
        </div>
        <Link to="/orders/refund">استرجاع</Link>

      </div> 
      <div className=' contact text-white flex flex-col text-right gap-4 text-lg pr-3.5 contact'  >
       <p>اتصل بنا</p>
       <p>حجز فندقي:123-456-7890</p>
       <p>مكتب التذاكر:123-456-7890</p>
      </div>
    </div> 
    </footer>
  )
}

export default Footer