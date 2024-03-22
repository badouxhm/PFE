import React from 'react'
import NavBar from '../composants/NavBar';
import LoginForm from '../composants/LoginForm';
import Footer from '../composants/Footer';

function PageConnexion() {
  const liens =[

  ]
  return (
    <div>
        <NavBar links={liens}/>
        <LoginForm />
        <Footer />
    </div>
  )
}

export default PageConnexion
