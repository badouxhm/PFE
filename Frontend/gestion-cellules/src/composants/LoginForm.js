import React, {useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const { jwtDecode } = require('jwt-decode');

function LoginForm() {
  const [loginPassword, setLoginPassword] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [MessageIncorrect,setMessageIncorrect] = useState(false)
  const navigateTo = useNavigate()  

  const loginUser =(e)=>{
    e.preventDefault();
    axios.post('http://localhost:3002/', {
    Email: loginEmail,
    Password: loginPassword,
    },
    )
      .then((response)=>{

      if(response.data.token){
        sessionStorage.setItem('token',response.data.token)
        const decoded = jwtDecode(response.data.token);
        sessionStorage.setItem('user',JSON.stringify(decoded))
        sessionStorage.setItem('role',JSON.stringify(decoded.role))
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
