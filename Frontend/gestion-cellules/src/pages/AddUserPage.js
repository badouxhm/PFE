import React from 'react'
import NavBarAdmin from '../navBars/navBarAdmin'
import NavBarediteur from '../navBars/navBarEditeur'
import NavBarviewer from '../navBars/navBarViewer'
import Footer from '../composants/Footer'
import AddUser from '../composants/Add_user'


const AddUserPage = () => {
    const role = sessionStorage.getItem('role')
  return (
    <div>
        {role === '0' ? <NavBarAdmin /> : role === '1' ? <NavBarediteur /> : <NavBarviewer />}
        <AddUser/>
        <Footer/>
      
    </div>
  )
}

export default AddUserPage

