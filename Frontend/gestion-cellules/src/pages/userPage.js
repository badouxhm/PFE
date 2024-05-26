import React from 'react'
import NavBarAdmin from '../navBars/navBarAdmin'
import NavBarediteur from '../navBars/navBarEditeur'
import NavBarviewer from '../navBars/navBarViewer'
import User from '../composants/user'
import Footer from '../composants/Footer'

const userPage = () => {
  const role = sessionStorage.getItem('role')

  return (
    <div>
        {role === '0' ? <NavBarAdmin /> : role === '1' ? <NavBarediteur /> : <NavBarviewer />}
        <User />
        <Footer />   
    </div>
  )
}

export default userPage
