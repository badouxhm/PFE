import React from 'react'
import NavBar from '../composants/NavBar'

const NavBarediteur = () => {
    const liens =[
        {name: 'Accueil' , lien:'/editeurAccueil'},
        {name: 'Cellules' , lien:'/cellulesPage'},
        {name: 'Historique' , lien:'/historique'},
        {name: 'Fichier' , lien:'/fichiersPage'},
        {name: 'Map' , lien:'/map'},
      ]
  return (
    <div>
        <NavBar links={liens} logo={'/editeurAccueil'}/>
      
    </div>
  )
}

export default NavBarediteur
