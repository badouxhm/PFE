import React from 'react'
import NavBar from '../composants/NavBar'
import Footer from '../composants/Footer'
import AddUser from '../composants/Add_user'


const AddUserPage = () => {
    const liens =[
        {name: 'Home' , lien:'/'},
        {name: 'Users' , lien:'/listeUser'},
        {name: 'Cellules' , lien:'/'},
      ]
  return (
    <div>
        <NavBar links={liens}/>
        <AddUser/>
        <Footer/>
      
    </div>
  )
}

export default AddUserPage

