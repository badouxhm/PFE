/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import NavBar_tailwind from '../composants/NavBar.jsx';
import Footer from '../composants/Footer.js';


const Admin_accueil = () => {

    const liens =[
        {name: 'Home' , lien:'/'},
        {name: 'Users' , lien:'/listeUser'},
        {name: 'Cellules' , lien:'/'},
      ]

  return (
    <div>
      <NavBar_tailwind links={liens}/>
      <Footer/>
    </div>
  )
}

export default Admin_accueil
