/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react'
import logo from '../assets/372956.svg'
import menu from '../assets/menu.png'

const NavBarVide = () => {

  
  let [open,setOpen] = useState(false);

  return (
    
    <div className='absolute shadow-md w-full top-0 left-0'>
      <div className='md:flex items-center justify-between py-4 md:px-10 px-7 bg-gray-200'>
        <div className='cursor-pointer flex items-center'>
            <a href="/">
                <img className='h-16 pl-5' src={logo} alt='logo'></img>
            </a>
        </div>
        <div>
          <div  onClick={()=>setOpen(!open)} className='text-red-600 w-5 absolute right-8 top-10 md:hidden cursor-pointer'>
            <img src={menu} alt="menu" />
          </div>
                
        </div>
        
      </div>
    </div>
  )
}

export default NavBarVide
