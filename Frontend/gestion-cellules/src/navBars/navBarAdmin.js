import React from 'react'
import NavBar from '../composants/NavBar'

const navBarAdmin = () => {
    const liens =[
        {name: 'Accueil' , lien:'/AdminAccueil'},
        {name: 'Utilisateurs' , lien:'/listeUser'},
        {name: 'Cellules' , lien:'/cellulesViewer'},
        {name: 'Historique' , lien:'/historique'},
        {name: 'Map' , lien:'/map'},
      ]
  return (
    <div>
        <NavBar links={liens} logo={'/adminAccueil'}/>

    </div>
  )
}

export default navBarAdmin
