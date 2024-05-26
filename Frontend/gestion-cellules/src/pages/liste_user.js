import React from 'react'
import NavBarAdmin from '../navBars/navBarAdmin'
import NavBarediteur from '../navBars/navBarEditeur'
import NavBarviewer from '../navBars/navBarViewer'
import Footer from '../composants/Footer'
import Liste from '../helpers/listeUsers.jsx'

const liste_user = () => {
  const role = sessionStorage.getItem('role')
  return (
    <div>
      {role === '0' ? <NavBarAdmin /> : role === '1' ? <NavBarediteur /> : <NavBarviewer />}
      <Liste/>
      <Footer/>
    </div>
  )
}

export default liste_user
