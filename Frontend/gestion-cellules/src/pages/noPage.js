import React, { useState } from 'react';
import { Fragment } from 'react';
import NavBarAdmin from '../navBars/navBarAdmin'
import NavBarediteur from '../navBars/navBarEditeur'
import NavBarviewer from '../navBars/navBarViewer'
import Footer from '../composants/Footer'
const NoPage = () => {

  const role = sessionStorage.getItem('role')
   
    return (
      <>
        {role === '0' ? <NavBarAdmin /> : role === '1' ? <NavBarediteur /> : <NavBarviewer />}
        <div className=' h-screen'>
        <h2 className="mt-32 text-2xl font-bold mb-6 text-center text-red-600">Cette page n'existe pas</h2>
        </div>
        <Footer/>
      </>
    );
  }
export default NoPage
