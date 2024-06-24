import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import BoiteDialogue from './boiteDialogue';
import SuccesDialog from './SuccesDialog';

const UpdateUser = () => {
  const [matricule, setMatricule] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [date_naissance, setDate_naissance] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [poste, setPoste] = useState('');
  const [messageExist, setMessageExist] = useState(false);
  const [dialogue, setDialogue] = useState(false);
  const [succes, setSucces] = useState(false);

  const navigateTo = useNavigate();
  const location = useLocation();
  const id_c = location.pathname.split('/')[2];

  const annuler = () => {
    navigateTo('/listeUser');
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/updateUser/${id_c}`, {
        headers: {
          'Authorization': `${sessionStorage.getItem('token')}`
        }
      });
      const data = response.data;
      if (Array.isArray(data) && data.length > 0) {
        const user = data[0];
        setMatricule(user.matricule);
        setNom(user.nom);
        setPrenom(user.prenom);
        setDate_naissance(user.date_naissance.split("T")[0]);
        setEmail(user.email);
        setTel(user.tel);
        setPassword(user.password);
        setRole(user.role);
        setPoste(user.poste);
      } else {
        console.error('Aucune donnée utilisateur trouvée');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données de l\'utilisateur', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateUser = async () => {
    try {
      const resultat = await axios.put(`http://localhost:3002/updateUser/${id_c}`, {
        Matricule: matricule,
        Nom: nom,
        Prenom: prenom,
        Date_naissance: date_naissance,
        Email: email,
        Password: password,
        Role: role,
        Poste: poste,
        Tel: tel
      }, {
        headers: {
          'Authorization': `${sessionStorage.getItem('token')}`,
        }
      });
  
      if (resultat.data.message) {
        setSucces(true);
      } 
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
    }
  };
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setDialogue(true);
  };

  const onDialog = (choix) => {
    if (choix) {
      updateUser();
    }
    setDialogue(false);
  };

  const handleSuccessDialogClose = () => {
    setSucces(false);
    navigateTo('/listeUser');
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 mt-24">
      <div className="container mx-auto w-2/3">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Modifier un utilisateur</h2>
          <div className={messageExist ? "h-10" : "hidden h-10"}>
            <h4 className="bg-red-600 mx-10 text-white rounded-lg text-center text-xl">Utilisateur déjà existant !</h4>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="matricule" className="block text-sm font-medium text-gray-600">Matricule</label>
              <input
                type="text"
                id="matricule"
                name="matricule"
                required
                className="mt-1 p-2 w-full border rounded-md"
                value={matricule}
                onChange={(e) => setMatricule(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="nom" className="block text-sm font-medium text-gray-600">Nom</label>
              <input
                type="text"
                id="nom"
                name="nom"
                required
                className="mt-1 p-2 w-full border rounded-md"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="prenom" className="block text-sm font-medium text-gray-600">Prénom</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                required
                className="mt-1 p-2 w-full border rounded-md"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="dateNaissance" className="block text-sm font-medium text-gray-600">Date de naissance</label>
              <input
                type="date"
                id="dateNaissance"
                name="dateNaissance"
                required
                className="mt-1 p-2 w-full border rounded-md"
                value={date_naissance}
                onChange={(e) => setDate_naissance(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 p-2 w-full border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="tel" className="block text-sm font-medium text-gray-600">N° Tel</label>
              <input
                type="text"
                id="tel"
                name="tel"
                required
                className="mt-1 p-2 w-full border rounded-md"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="mt-1 p-2 w-full border rounded-md"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-600">Rôle</label>
              <select
                id="role"
                name="role"
                required
                className="mt-1 p-2 w-full border rounded-md"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Sélectionnez le rôle</option>
                <option value="0">Administrateur</option>
                <option value="1">Éditeur</option>
                <option value="2">Viewer</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="poste" className="block text-sm font-medium text-gray-600">Poste</label>
              <input
                type="text"
                id="poste"
                name="poste"
                required
                className="mt-1 p-2 w-full border rounded-md"
                value={poste}
                onChange={(e) => setPoste(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={annuler}
                className="bg-red-600 text-white p-2 mx-4 rounded-md hover:bg-red-900"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="bg-red-600 text-white p-2 mx-4 rounded-md hover:bg-red-900"
              >
                Valider
              </button>
            </div>
          </form>

          {dialogue && (
            <BoiteDialogue
              message="Vous voulez vraiment modifier cet utilisateur ?"
              onDialog={onDialog}
            />
          )}

          {succes && (
            <SuccesDialog
              message="Utilisateur modifié avec succès"
              onClose={handleSuccessDialogClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
