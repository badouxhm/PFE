import React from 'react'
import NavBar from '../composants/NavBar'
import Footer from '../composants/Footer'
const viewer_accueil = () => {
    const liens =[
        {name: 'Home' , lien:'/'},
        {name: 'Users' , lien:'/listeUser'},
        {name: 'Cellules' , lien:'/'},
      ]

  return (
    <div>
      <NavBar links={liens}/>
      <Footer/>
    </div>
  )
}

export default viewer_accueil
