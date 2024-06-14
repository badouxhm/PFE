import React ,{useState} from 'react'
import axios from 'axios';
import SuccessDialog from './SuccesDialog';
import { useNavigate } from 'react-router-dom';
const Add_user = () => {

  const [matricule, setMatricule] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [date_naissance, setDate_naissance] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [poste, setPoste] = useState('');
  const [MessageExist,setMessageExist] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigateTo = useNavigate()  

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigateTo('/listeUser')
  };

  const createUser =(e)=>{
    e.preventDefault();
    axios.post('http://localhost:3002/addUser',{
      Matricule : matricule,
      Nom : nom,
      Prenom : prenom,
      Date_naissance : date_naissance,
      Email : email,
      Tel : tel,
      Password : password,
      Role : role,
      Poste : poste
    },{headers :{'Authorization':`${sessionStorage.getItem('token')}`}}).then((resultat)=>{
      if (resultat.data.recu) {
        setShowSuccessModal(true);
      }
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
        <div className={MessageExist ? "h-10" : "hidden h-10"}>
              <h4 className='bg-red-600 mx-10 text-white  rounded-lg text-center text-xl'>Utilisateur deja existant !</h4>
            </div>
          <div className="mb-4">
            <label htmlFor="Matricule" className="block text-sm font-medium text-gray-600">
            Matricule
            </label>
            <input
              type="Matricule"
              id="Matricule"
              name="Matricule"
              required
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(e)=>{setMatricule(e.target.value)}}
            />
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
            <label htmlFor="tel" className="block text-sm font-medium text-gray-600">
              N° Tel
            </label>
            <input
              type="tel"
              id="tel"
              name="tel"
              required
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(e)=>{setTel(e.target.value)}}
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
              <option value="0">Administrateur</option>
              <option value="1">Éditeur</option>
              <option value="2">Viewer</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="Poste" className="block text-sm font-medium text-gray-600">
              Poste
            </label>
            <input
              type="poste"
              id="poste"
              name="poste"
              required
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(e)=>{setPoste(e.target.value)}}
            />
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
        {showSuccessModal && (
            <SuccessDialog
              message="Utilisateur ajouté avec succès !"
              onClose={handleCloseSuccessModal}
            />
          )}
      </div>
    </div>
  </div>
);
};


export default Add_user
