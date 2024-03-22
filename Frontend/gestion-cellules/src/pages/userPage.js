import React from 'react'
import NavBar from '../composants/NavBar'
import User from '../composants/user'
import Footer from '../composants/Footer'

const userPage = () => {
  const liens =[
    {name: 'Home' , lien:'/'},
    {name: 'Users' , lien:'/'},
    {name: 'Cellules' , lien:'/'},
  ]

  return (
    <div>
        <NavBar links={liens} />
        <User />
        <Footer />   
    </div>
  )
}

export default userPage
