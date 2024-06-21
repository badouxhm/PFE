import React, { useState, useEffect } from 'react';
import { CiImport } from "react-icons/ci";
import NavBarAdmin from '../navBars/navBarAdmin';
import NavBarediteur from '../navBars/navBarEditeur';
import NavBarviewer from '../navBars/navBarViewer';
import ListeFile from '../composants/liste_files';
import Footer from '../composants/Footer';
import axios from 'axios';
import SuccessDialog from '../composants/SuccesDialog'; // Importe le composant SuccessDialog

const Fichiers_page = () => {
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [preview, setPreview] = useState(null);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [successMessage, setSuccessMessage] = useState("");
    let fd = null;

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
            return;
        }

        axios.post("http://localhost:3002/FichiersPage", fd, {
            headers: {
                'Authorization': `${sessionStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: progressEvent => {
                const { loaded, total } = progressEvent;
                const percentage = Math.floor((loaded * 100) / total);
                setUploadPercentage(percentage);
            }
        })
        .then(() => {
            setPreview(null);
            setFile(null);
            setUploadPercentage(0);
            fetchFiles();
            setSuccessMessage("Fichier envoyé avec succès !");
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

    const role = sessionStorage.getItem('role');

    return (
        <>
            {role === '0' ? <NavBarAdmin /> : role === '1' ? <NavBarediteur /> : <NavBarviewer />}
            <div className="container mx-auto flex flex-col items-center justify-center m-10 mt-32">
                <h1 className="text-3xl  mb-6 text-center text-red-600">Importer un fichier</h1>
                <div className="bg-red-600 hover:bg-red-900 text-white text-2xl font-bold py-2 px-4 rounded w-1/3 flex items-center justify-center cursor-pointer">
                    <input
                        type="file"
                        accept=".csv"
                        name="file"
                        id="file"
                        hidden
                        onChange={handleUpload}
                    />
                    <label htmlFor="file" className="flex items-center cursor-pointer">
                        <CiImport className="text-3xl mr-2" />
                        Choisir un fichier
                    </label>
                </div>
                {preview && (
                    <div className="mt-4 border border-gray-300 p-4 rounded-lg w-full md:w-3/4 lg:w-1/2">
                        <h2 className="text-lg font-bold mb-2">Aperçu du fichier :</h2>
                        <img src={preview} alt="Aperçu du fichier" className="w-full h-auto object-cover" />
                    </div>
                )}
                <button onClick={handleClick} className="mt-4">
                    <div className="bg-red-600 hover:bg-red-900 flex items-center justify-center w-32 rounded-md text-2xl text-white font-bold p-3">
                        Envoyer
                    </div>
                </button>
                {uploadPercentage > 0 && (
                    <div className="w-full md:w-3/4 lg:w-1/2 mt-4">
                        <div className="h-6 relative w-full border rounded-md">
                            <div className="absolute top-0 left-0 h-full bg-red-500 rounded-md" style={{ width: `${uploadPercentage}%` }}>
                                <span className="absolute right-0 mr-2 text-white text-sm">{uploadPercentage}%</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="container mx-auto mt-8">
                <h1 className="text-2xl text-center text-red-600 mb-6">Liste des fichiers ajoutés récemment</h1>
                <ListeFile files={files} />
            </div>
            <Footer />

            {successMessage && <SuccessDialog message={successMessage} onClose={() => setSuccessMessage("")} />}
        </>
    );
};

export default Fichiers_page;
