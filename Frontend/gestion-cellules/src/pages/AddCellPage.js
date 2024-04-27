import React from 'react'
import NavBar from '../composants/NavBar'
import Footer from '../composants/Footer'
import AddCell from '../composants/Add_cell'


const AddUserPage = () => {
    const liens =[
        {name: 'Home' , lien:'/'},
        {name: 'Users' , lien:'/listeUser'},
        {name: 'Cellules' , lien:'/'},
      ]
  return (
    <div>
        <NavBar links={liens}/>
        <AddCell/>
        <Footer/>
    </div>
  )
}

export default AddUserPage

