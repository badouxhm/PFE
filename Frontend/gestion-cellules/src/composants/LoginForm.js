import React, {useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
//import '../styles/LoginForm.css'
//import UserIcon from '../assets/user-126-16.png'
//import PasswordIcon from '../assets/password-42-16.png'

function LoginForm() {
  const [loginPassword, setLoginPassword] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [MessageIncorrect,setMessageIncorrect] = useState(false)
  const [Token, setToken] = useState('')
  const navigateTo = useNavigate()  

  // Fonction pour enregistrer le token JWT dans le stockage local
  const saveTokenToLocalStorage = (Token) => {
    localStorage.setItem('jwtToken', Token);
  };

  // Fonction pour récupérer le token JWT depuis le stockage local
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem('jwtToken');
  };

  // Fonction pour supprimer le token JWT du stockage local lors de la déconnexion
  // const removeTokenFromLocalStorage = () => {
  //   localStorage.removeItem('jwtToken');
  // };

  const loginUser =(e)=>{
    e.preventDefault();
    axios.post('http://localhost:3002/', {
    Email: loginEmail,
    Password: loginPassword,
    Authorization: `${getTokenFromLocalStorage()}`,
    },
    )
      .then((response)=>{
      console.log(response.data)
      if(response.data.token){
         setToken(response.data.token);
         saveTokenToLocalStorage(response.data.token)
         console.log("le token" , Token)
      }

      if (response.data.role === 0){navigateTo('/AdminAccueil')}
      else if(response.data.role === 1){navigateTo('/editeurAccueil')}
      else if(response.data.role === 2){navigateTo('/viewerAccueil')}
      if (response.data.message){console.log(response.data.message) 
        setMessageIncorrect(true)
      }
    })
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
    <div className="container mx-auto max-w-md">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl text-red-600 font-bold mb-6 text-center">Connexion</h2>
        <form >
          <div className="mb-4">
          <div className={MessageIncorrect ? "" : "hidden"}>
              <h4 className='bg-red-600 text-white rounded-sm text-center'>E-mail ou Mot de passe incorrect !</h4>
            </div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(e)=>{setLoginEmail(e.target.value)}}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 p-2 w-full border rounded-md "
              onChange={(e)=>{setLoginPassword(e.target.value)}}
            />
          </div>
          <div className='flex justify-center'>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-900 text-white p-2 rounded-md "
              onClick={loginUser}
            >
              Se connecter
            </button>
          </div>    
        </form>
      </div>
    </div>
  </div>
);
};
export default LoginForm
