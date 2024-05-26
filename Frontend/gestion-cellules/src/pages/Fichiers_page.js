import React, { useState, useEffect } from 'react';
import { CiImport } from "react-icons/ci";
import NavBarAdmin from '../navBars/navBarAdmin'
import NavBarediteur from '../navBars/navBarEditeur'
import NavBarviewer from '../navBars/navBarViewer'
import ListeFile from '../composants/liste_files';
import Footer from '../composants/Footer';
import axios from 'axios';

const Fichiers_page = () => {
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [preview, setPreview] = useState(null);
    let fd = null;

    const liens = [
        { name: 'Home', lien: '/' },
        { name: 'Users', lien: '/listeUser' },
        { name: 'Cellules', lien: '/' },
    ];

    const handleUpload = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setPreview(null);
        }
    };

    const handleClick = () => {
        if (file === null) {
            console.log("Aucun fichier sélectionné !");
            return;
        }
        fd = new FormData();
        fd.append('file', file);
        fd.append('nom', file.name);
        fd.append('date_modification', file.lastModifiedDate.toISOString());
        SendFile();
    };

    const SendFile = () => {
        if (fd === null) {
            console.log("Aucun fichier à envoyer.");
            return;
        }

        axios.post("http://localhost:3002/FichiersPage", fd, {
            headers: {
                'Authorization': `${sessionStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data' // assuming you're sending form data
            }
        })
        .then(() => {
            console.log("Fichier envoyé !");
            setPreview(null); // Clear the preview after sending the file
            setFile(null); // Clear the file input after sending the file
            fetchFiles(); // Fetch the updated list of files
        })
        .catch(error => {
            console.error("Une erreur s'est produite lors de l'envoi du fichier :", error);
        });
        
    };

    const fetchFiles = () => {
        axios.get('http://localhost:3002/FichiersPage')
            .then((res) => {
                setFiles(res.data);
            })
            .catch((err) => {
                console.error('Error fetching files:', err);
            });
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const role = sessionStorage.getItem('role')

    return (
        <>
            {role === '0' ? <NavBarAdmin /> : role === '1' ? <NavBarediteur /> : <NavBarviewer />}
            <div className="container mx-auto flex-col flex items-center justify-center m-10 mt-32">
                <h1 className="text-2xl font-bold mb-6 text-center text-red-600">Importer un fichier</h1>
                <div className='bg-red-600 hover:bg-red-900 text-white text-2xl font-bold py-2 px-4 rounded w-3/5 flex items-center justify-center'>
                    <input
                        type='file'
                        accept='.csv'
                        name="file"
                        id="file"
                        hidden
                        onChange={handleUpload}
                    />
                    <div className='p-2 text-3xl font-bold'>
                        <CiImport />
                    </div>
                    <label htmlFor="file" className=''> Choisir un fichier </label>
                </div>
                {preview && (
                    <div className="mt-4 border border-gray-300 p-4 rounded-lg">
                        <h2 className="text-lg font-bold mb-2">Aperçu du fichier :</h2>
                        <img src={preview} alt="Aperçu du fichier" className="w-full h-auto object-cover" />
                        </div>
                )}
                <button onClick={handleClick}>
                    <div className='bg-red-600 hover:bg-red-900 flex items-start justify-center w-32 rounded-md text-2xl text-white font-bold p-3 mt-3'>
                        Envoyer
                    </div>
                </button>
            </div>
            <div>
                <h1 className='text-2xl text-center text-red-600'>Liste des fichiers ajoutés récemment</h1>
                <ListeFile files={files} />
            </div>
            <Footer />
        </>
    );
};

export default Fichiers_page;