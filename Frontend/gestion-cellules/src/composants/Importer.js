import React, { useState } from 'react';
import axios from 'axios';
import { CiImport } from "react-icons/ci";

const Importer = () => {
  const [file, setFile] = useState(null); // État local pour gérer le fichier sélectionné
  let fd = null; // Déclaration de fd en dehors de la fonction Importer

  const handleClick = () => {
    if (file === null) {
      console.log("Aucun fichier sélectionné", file);
      return;
    }
    fd = new FormData();
    fd.append('file', file);
    console.log("Fichier sélectionné :", file);
    SendFile();
  }

  const SendFile = () => {
    if (fd === null) {
      console.log("Aucun fichier à envoyer.");
      return;
    }

    axios.post("http://localhost:3000/FichiersPage",{headers :{'Authorization': `${sessionStorage.getItem('token')}`}}, {
      data: fd,
    }).then(() => {
      console.log("Fichier envoyé !");
    }).catch(error => {
      console.error("Une erreur s'est produite lors de l'envoi du fichier :", error);
    });
  }

  return (
    <>
      <div className=' bg-red-600 hover:bg-red-900 text-white text-2xl font-bold py-2 px-4 rounded w-3/5 flex items-center justify-center'>
        <input
          type='file'
          accept='.csv'
          name="file"
          id="file"
          hidden
          onChange={(e) => { setFile(e.target.files[0]) }}
        />
        <div className='p-2 text-3xl font-bold'>
          <CiImport />
        </div>
        <label htmlFor="file">Choisir un fichier</label>
      </div>
      <button onClick={handleClick}>
        <div className=' bg-red-600 hover:bg-red-900 flex items-start justify-center w-32 rounded-md text-2xl text-white font-bold p-3 mt-3'>
          Envoyer
        </div>
      </button>
    </>
  )
}

export default Importer;
