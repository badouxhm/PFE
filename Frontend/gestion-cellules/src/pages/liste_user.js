import React from 'react'
import NavBar from '../composants/NavBar.jsx'
import Footer from '../composants/Footer'
import Liste from '../helpers/listeUsers.jsx'

const liste_user = () => {
    const liens =[
        {name: 'Home' , lien:'/'},
        {name: 'Users' , lien:'/'},
        {name: 'Cellules' , lien:'/'},
      ]
  return (
    <div>
      <NavBar links={liens}/>
      <Liste/>
      <Footer/>
    </div>
  )
}

export default liste_user
