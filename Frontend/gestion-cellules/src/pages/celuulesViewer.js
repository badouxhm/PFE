import React from 'react'
import NavBarAdmin from '../navBars/navBarAdmin'
import NavBarediteur from '../navBars/navBarEditeur'
import NavBarviewer from '../navBars/navBarViewer'
import Footer from '../composants/Footer'
import ListeCellules from '../composants/liste_cellules_viewer'
const cellulesViewer = () => {
        const role = sessionStorage.getItem('role')
  return (
    <div>
      {role === '0' ? <NavBarAdmin /> : role === '1' ? <NavBarediteur /> : <NavBarviewer />}
      <ListeCellules/>
      <Footer/>
    </div>
  )
}

export default cellulesViewer
