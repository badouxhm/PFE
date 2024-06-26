import React from 'react'
import NavBarAdmin from '../navBars/navBarAdmin'
import NavBarediteur from '../navBars/navBarEditeur'
import NavBarviewer from '../navBars/navBarViewer'
import UpdateCell from '../composants/updateCell'
import Footer from '../composants/Footer'
const updateCellPage = () => {
  const role = sessionStorage.getItem('role')
  return (
    <div>
        {role === '0' ? <NavBarAdmin /> : role === '1' ? <NavBarediteur /> : <NavBarviewer />}
        <UpdateCell />
        <Footer/>
    </div>
  )
}

export default updateCellPage
