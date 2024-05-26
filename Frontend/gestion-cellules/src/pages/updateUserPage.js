import React from 'react'
import NavBarAdmin from '../navBars/navBarAdmin'
import NavBarediteur from '../navBars/navBarEditeur'
import NavBarviewer from '../navBars/navBarViewer'
import UpdateUser from '../composants/updateUser'
import Footer from '../composants/Footer'
const updateUserPage = () => {
  const role = sessionStorage.getItem('role')
  return (
    <div>
        {role === '0' ? <NavBarAdmin /> : role === '1' ? <NavBarediteur /> : <NavBarviewer />}
        <UpdateUser />
        <Footer/>
    </div>
  )
}

export default updateUserPage
