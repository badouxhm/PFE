import React from 'react'
import Footer from '../composants/Footer'
import NavBarviewer from '../navBars/navBarViewer'
import ChartT from '../composants/chart'
const viewer_accueil = () => {


  return (
    <div>
      <NavBarviewer />
      <ChartT/>
      <Footer/>
    </div>
  )
}

export default viewer_accueil
