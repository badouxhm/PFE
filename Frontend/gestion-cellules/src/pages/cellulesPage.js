import React from 'react'
import NavBar from '../composants/NavBar'
import Footer from '../composants/Footer'
import ListeCellules from '../composants/liste_cellules'
const cellulesPage = () => {
        const liens =[
            {name: 'Home' , lien:'/'},
            {name: 'Users' , lien:'/'},
            {name: 'Cellules' , lien:'/'},
          ]
  return (
    <div>
      <NavBar links={liens}/>
      <ListeCellules/>
      <Footer/>
    </div>
  )
}

export default cellulesPage
