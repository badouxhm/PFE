import React ,{useState} from 'react'
import axios from 'axios';


const Add_user = () => {

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [date_naissance, setDate_naissance] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [MessageExist,setMessageExist] = useState(false)

  const createUser =(e)=>{
    e.preventDefault();
    axios.post('http://localhost:3002/addUser',{
      Nom : nom,
      Prenom : prenom,
      Date_naissance : date_naissance,
      Email : email,
      Password : password,
      Role : role,
    }).then((resultat)=>{
      if (resultat.data.message){
        console.log(resultat.data)
        setMessageExist(true)
      }
    })
  }
  
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 mt-24 ">
    <div className="container mx-auto  w-2/3">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Ajouter un utilisateur</h2>
        <form >
        <div className={MessageExist ? "" : "hidden"}>
              <h4 className='bg-red-600 text-white mx-10 rounded-lg text-center'>E-mail deja existant !</h4>
            </div>
          <div className="mb-4">
            <label htmlFor="nom" className="block text-sm font-medium text-gray-600">
              Nom
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              required
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(e)=>{setNom(e.target.value)}}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="prenom" className="block text-sm font-medium text-gray-600">
              Prénom
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              required
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(e)=>{setPrenom(e.target.value)}}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="dateNaissance" className="block text-sm font-medium text-gray-600">
              Date de naissance
            </label>
            <input
              type="date"
              id="dateNaissance"
              name="dateNaissance"
              required
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(e)=>{setDate_naissance(e.target.value)}}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(e)=>{setPassword(e.target.value)}}
            />    
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-600">
              Rôle
            </label>
            <select
              id="role"
              name="role"
              required
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(e)=>{setRole(e.target.value)}}
            >
              <option value=""  >Sélectionnez le rôle</option>
              <option value="1">Éditeur</option>
              <option value="2">Viewer</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-red-600 text-white p-2 rounded-md hover:bg-red-900"
              onClick={createUser}
            >
              Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);
};


export default Add_user
