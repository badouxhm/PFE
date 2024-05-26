import React from 'react'
import NavBar from '../composants/NavBar'

const NavBarviewer = () => {
    const liens =[
        {name: 'Home' , lien:'/viewerAccueil'},
        {name: 'Cellules' , lien:'/cellulesViewer'},
        {name: 'Map' , lien:'/map'},
      ]
  return (
    <div>
        <NavBar links={liens} logo={'/viewerAccueil'}/>
      
    </div>
  )
}

export default NavBarviewer
