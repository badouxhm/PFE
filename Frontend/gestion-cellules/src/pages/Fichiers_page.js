import React, { useState ,useEffect } from 'react'
import { CiImport } from "react-icons/ci";

// import Importer from '../composants/Importer'
import NavBar from '../composants/NavBar'
import ListeFile from '../composants/liste_files';
import Footer from '../composants/Footer';
import axios from 'axios';
const Fichiers_page = () => {
    const [file,setFile] = useState(null)
    const [files,setFiles] = useState(null)
    
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
            console.log("Aucun fichier sélectionné !");
            return;
          }
          fd = new FormData();
          fd.append('file', file);
          console.log("Fichier sélectionné :", file);
          fd.append('nom', file.name);
          fd.append('date_modification', file.lastModifiedDate.toISOString());
          console.log(fd)
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
      
        useEffect(() => {
          axios.get('http://localhost:3002/FichiersPage')
          .then((res)=>{
            // console.log(res.data)
            setFiles(res.data)
          })
          .catch((err)=>{
            console.error('Error fetching files:', err);
          })
        }, []);
  return (
    <>
    <NavBar links={liens} />
    <div className="container mx-auto flex-col flex items-center justify-center m-10 mt-32" >
    <h1 className="text-2xl font-bold mb-6 text-center text-red-600">Importer un fichier</h1>
    <div className=' bg-red-600 hover:bg-red-900 text-white text-2xl font-bold py-2 px-4 rounded w-3/5 flex items-center justify-center'>
        <input
            class=""
            type='file'
            accept='.csv'
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
    <div>
      <h1 className='text-2xl text-center text-red-600 '>Liste des fichiers ajoutés récemment</h1>
      <ListeFile files={files} />
    </div>
    <Footer/>
    </>
  )
}

export default Fichiers_page
