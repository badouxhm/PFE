/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import NavBarAdmin from '../navBars/navBarAdmin.js';
import Footer from '../composants/Footer.js';
import ChartT from '../composants/chart.js';


const Admin_accueil = () => {



  return (
    <div>
      <NavBarAdmin />
        <ChartT/>
      <Footer/>
    </div>
  )
}

export default Admin_accueil
