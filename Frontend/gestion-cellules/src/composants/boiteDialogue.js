import React from 'react'

const boiteDialogue = ({message,onDialog}) => {
  return (<>
<div className='fixed inset-0 bg-black bg-opacity-50 z-40'>
  <div className=' flex items-center justify-center   transform translate-y-64 '>
    <div className='border-collapse rounded-lg'>
      <div className='flex flex-col items-center bg-gray-300 w-96 text-center rounded-lg'>
        <div className='bg-red-600 w-full text-12 h-16 rounded-t-lg'>
          <h3 className='m-6 my-2 text-lg text-white'>{message}</h3>
        </div>
        <div className='flex flex-row my-12'>
          <div className='w-24 h-12 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700'>
            <button
            className='text-white'
            onClick={()=>onDialog(false)} 
            >Annuler</button>
        </div>
          <div className='w-6'></div>
          <div className='w-24 h-12 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700'>
            <button 
            className='text-white'
            onClick={()=>onDialog(true)} 
            >Valider</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  </>
  )
}

export default boiteDialogue
