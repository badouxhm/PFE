import React, { useState } from 'react'
import { CiImport } from "react-icons/ci";
// import Importer from '../composants/Importer'
import NavBar from '../composants/NavBar'
import axios from 'axios';
const Fichiers_page = () => {
    const [file,setFile] = useState(null)
    let fd = null; // Déclaration de fd en dehors de la fonction Importer


    const liens =[
        {name: 'Home' , lien:'/'},
        {name: 'Users' , lien:'/listeUser'},
        {name: 'Cellules' , lien:'/'},
    ]
 
    const handleUpload = (e) => {
        setFile(e.target.files[0])
    }


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
      
          axios.post("http://localhost:3002/FichiersPage",fd
          ).then(() => {
            console.log("Fichier envoyé !");
          }).catch(error => {
            console.error("Une erreur s'est produite lors de l'envoi du fichier :", error);
          });
        }
      
      
  return (
    <>
    <NavBar links={liens} />
    <div className="container mx-auto flex-col flex items-center justify-center m-10 mt-32" >
    <div className=' bg-red-600 hover:bg-red-900 text-white text-2xl font-bold py-2 px-4 rounded w-3/5 flex items-center justify-center'>
        <input
            class=""
            type='file'
            // accept='.csv'
            name="file" id="file" 
            hidden
            onChange={handleUpload}
        />

        
        <div className='p-2 text-3xl font-bold'>
          <CiImport/>
        </div>
  
        <label for="file" className=''> Choisir un fichier </label>
    </div>
        <button onClick={handleClick}>
                    <div className=' bg-red-600 hover:bg-red-900 flex items-start justify-center w-32 rounded-md text-2xl text-white font-bold p-3 mt-3'>
                        Envoyer
                    </div>
        </button >
    </div>
    </>
  )
}

export default Fichiers_page
