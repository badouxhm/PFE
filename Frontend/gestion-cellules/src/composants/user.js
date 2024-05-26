import React from 'react'

const userinfo = JSON.parse(sessionStorage.getItem('user'))
console.log(userinfo)
const utilisateur = {
    firstName: 'Hamchaoui',
    lastName: 'Badreddine',
    role: 'Admin',
    email: 'badouhm2003@gmail.com',
    profileImage: 'https://img.freepik.com/vecteurs-premium/icone-profil-utilisateur-dans-style-plat-illustration-vectorielle-avatar-membre-fond-isole-concept-entreprise-signe-autorisation-humaine_157943-15752.jpg',
  };

const user = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
     
     
     
      <div className="bg-white p-8 rounded shadow-md text-center w-1/3 ">
        <img
          className="w-32 h-32 rounded-full mb-4 mx-auto"
          src={utilisateur.profileImage}
          alt={`${utilisateur.firstName} ${utilisateur.lastName}`}
        />
        <h2 className="text-2xl mb-4">
          <b>Nom :</b>  {userinfo.nom}
        </h2>
        <h2 className="text-2xl  mb-4">
          <b>Prénom :</b>  {userinfo.prenom}
        </h2>
        <p className="text-gray-500 mb-2"><b>Role : </b>{userinfo.role === 0 ? 'admin' : userinfo.role === 1 ? 'editeur' : userinfo.role === 2 ? 'viewer' : ''}</p>
        <p className="text-gray-500 mb-4"><b>E-mail : </b>{userinfo.email}</p>

      </div>
    </div>
  );
}

export default user
