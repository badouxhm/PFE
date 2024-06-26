import React from 'react'
import { FaRegUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
const Button_icon = () => {

  const deconnecter = ()=>{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }

  return (
    <div className='flex md:flex-row flex-col gap-3 md:m-4 md:ml-8 text-xl  '>
        <a href='/userPage' className='my-1 text-red-600 hover:text-red-950 duration-500'><FaRegUser/></a>
        <a  onClick={deconnecter} href='/' className='my-1 text-red-600 hover:text-red-950 duration-500'><LuLogOut/></a>
    </div>
  )
}

export default Button_icon
