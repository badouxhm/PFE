import React from 'react'
import NavBar from '../composants/NavBar'

const navBarAdmin = () => {
    const liens =[
        {name: 'Home' , lien:'/AdminAccueil'},
        {name: 'Users' , lien:'/listeUser'},
        {name: 'Cellules' , lien:'/cellulesPage'},
        {name: 'Historique' , lien:'/historique'},
        {name: 'Fichier' , lien:'/fichiersPage'},
        {name: 'Map' , lien:'/map'},
      ]
  return (
    <div>
        <NavBar links={liens} logo={'/adminAccueil'}/>

    </div>
  )
}

export default navBarAdmin
