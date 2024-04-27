/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react'
import logo from '../assets/372956.svg'
import menu from '../assets/menu.png'
import Button_icon from '../helpers/Button_icon'

const NavBar_tailwind = (props) => {

 
  
  let [open,setOpen] = useState(false);

  return (
    
    <div className='absolute shadow-md w-full top-0 left-0'>
      <div className='md:flex items-center justify-between py-4 md:px-10 px-7 bg-gray-200'>
        <div className='cursor-pointer flex items-center'>
            <a href='/'>
                <img className='h-16 pl-5' src={logo} alt='logo'></img>
            </a>
        </div>
        <div>
          <div  onClick={()=>setOpen(!open)} className='text-red-600 w-5 absolute right-8 top-10 md:hidden cursor-pointer'>
            <img src={menu} alt="menu" />
          </div>
                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-gray-200 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-300px]'} `}>
            {
              
              props.links.map((x)=>(
                <li key={x.nom} className='md:ml-8 text-xl md:my-0 my-7'>                
                  <a className='text-red-600 hover:text-red-950 duration-500' href={x.lien}>{x.name}</a>
                </li>
              ))
            }
          <Button_icon />
          </ul>
        </div>
        
      </div>
    </div>
  )
}

export default NavBar_tailwind
