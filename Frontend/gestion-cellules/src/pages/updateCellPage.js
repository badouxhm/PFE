import React from 'react'
import NavBar from '../composants/NavBar'
import UpdateCell from '../composants/updateCell'
import Footer from '../composants/Footer'
const updateCellPage = () => {
    const liens =[

    ]
  return (
    <div>
        <NavBar links={liens}/>
        <UpdateCell />
        <Footer/>
    </div>
  )
}

export default updateCellPage
