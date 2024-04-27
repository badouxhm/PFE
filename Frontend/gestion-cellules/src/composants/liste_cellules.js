import React, { useEffect, useState } from 'react';
import BarreRecherche from './barreRecherche';
import BoiteDialogue from '../composants/boiteDialogue';
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import './ScrollBar.css';
import axios from 'axios';

const ListeCellules = () => {
    const [rechercheKey, setRechercheKey] = useState("");
    const [initialcells, setInitialcells] = useState([]);
    const [cells, setCells] = useState([]);
    const [listeVisible, setListeVisible] = useState(false);
    const [dialogueSuprimmer, setDialogueSuprimmer] = useState(false);
    const [deleteId, setDeletedId] = useState(0);
    const [deleted, setDeleted] = useState(true);

    const toggleListe = () => {
        setListeVisible(!listeVisible);
    };

    const [colonnesVisibles, setColonnesVisibles] = useState({
        id_c: true,
        sup: true,
        siteCode: true,
        siteLocation: true,
        cellCi: true,
        cellName: true,
        ciDec: true,
        ciHex: true,
        lac: true,
        lacHex: true,
        technologie: true,
        bscOmc: true,
        bsc: true,
        siteStatus: true,
        x: true,
        y: true,
        commune: true,
        codeCommune: true,
        id: true,
        wilaya: true,
        nature: true,
        code: true,
    });

    const handleToggleColonne = (nomColonne) => {
        setColonnesVisibles({
            ...colonnesVisibles,
            [nomColonne]: !colonnesVisibles[nomColonne]
        });
    };

    const handleSupprimer = (id) => {
        setDialogueSuprimmer(true);
        setDeletedId(id);
    };

    const onDialogSup = (choix) => {
        if (choix) {
            deleteCell(deleteId);
            setDialogueSuprimmer(false);
        } else {
            setDialogueSuprimmer(false);
        }
    };

    useEffect(() => {
        if (rechercheKey) {
            axios.get(`http://localhost:3002/cellulesPage/${rechercheKey}`)
                .then((res) => {
                    setCells(res.data);
                }).catch((err) => {
                    console.log("Erreur dans la recherche :", err);
                });
        } else {
            setCells(initialcells);
        }
    }, [rechercheKey, initialcells]);

    useEffect(() => {
        if (deleted) {
            axios.get('http://localhost:3002/cellulesPage')
                .then((res) => {
                    setInitialcells(res.data);
                    setCells(res.data);
                }).catch((error) => {
                    console.error('Error fetching users:', error);
                });
        }
    }, [deleted]);

    const deleteCell = (id) => {
        setDeleted(true);
        axios.delete(`http://localhost:3002/cellulesPage/${id}`)
            .catch((error) => {
                console.error('Error deleting user:', error);
            });
    };

    return (
        <div className='bg-gray-100 min-h-screen min-w-max'>
            <div className='flex flex-col mt-10 p-28 px-2 bg-gray-100'>
                <div className='flex flex-row '>
                    <BarreRecherche value={rechercheKey} setValue={setRechercheKey}/>
                    <a href='/'>
                        <button>
                            <div className=' bg-red-600 hover:bg-red-900 flex items-center justify-center w-16 h-10 rounded-md text-2xl text-white  p-3 mr-12'>
                                <FaPlus />
                            </div>
                        </button>
                    </a>
                    <div>
                        <button
                            id="dropdownCheckboxButton"
                            className="text-white bg-red-700 hover:bg-red-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 "
                            onClick={toggleListe}
                            type="button"
                        >
                            Filtrer
                            <svg
                                className={`w-2.5 h-2.5 ms-3 ${listeVisible ? 'transform rotate-180' : ''}`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                />
                            </svg>
                        </button>
                        {listeVisible && (
                            <div id="dropdownDefaultCheckbox" className="absolute z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-100 dark:divide-gray-600">
                                <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
                                    {Object.entries(colonnesVisibles).map(([key, value]) => (
                                        <div key={key} className="flex items-center">
                                            <input
                                                className="w-4 h-4 text-red-600 bg-white border-gray-300 rounded focus:ring-red-500"
                                                type="checkbox"
                                                id={key}
                                                value={key}
                                                checked={value}
                                                onChange={(e) => handleToggleColonne(e.target.value)}
                                            />
                                            <label htmlFor={key} className="ml-2 text-black ">{key}</label>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className="bg-gray-100 p-0 overflow-x-auto">
                    <div className="container mx-auto flex-col ">
                        <div className='flex '>
                            <table className="w-full border-collapse m-10 rounded-lg shadow-md overflow-hidden ">
                                <thead className='bg-red-600'>
                                    <tr>
                                        {Object.entries(colonnesVisibles).map(([cle, valeur]) => (
                                            valeur && <th key={cle} className="px-6 py-3 text-center text-xs font-medium text-white uppercase">{cle}</th>
                                        ))}
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">status</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {cells.length === 0 ? (
                                        <tr>
                                            <td colSpan="26" className="px-6 py-3 text-center">Pas de cellules</td>
                                        </tr>
                                    ) : (
                                        cells.map((item) => (
                                            <tr key={item.id_c}>
                                                <td className={`px-6 py-4 ${colonnesVisibles.id_c ? '' : 'hidden'}`}>{item.id_c}</td>
                                                <td className={`px-6 py-4 ${colonnesVisibles.sup ? '' : 'hidden'}`}>{item.SUP}</td>
                                                <td className={`px-6 py-4 ${colonnesVisibles.siteCode ? '' : 'hidden'}`}>{item.Site_Code}</td>
                                                <td className={`px-6 py-4 ${colonnesVisibles.siteLocation ? '' : 'hidden'}`}>{item.Site_Location}</td>
                                                <td className={`px-6 py-4 ${colonnesVisibles.cellCi ? '' : 'hidden'}`}>{item.Cell_CI}</td>
                                                <td className={`px-6 py-4 ${colonnesVisibles.cellName ? '' : 'hidden'}`}>{item.Cell_Name}</td>
                                                <td className={`px-6 py-4 ${colonnesVisibles.ciDec ? '' : 'hidden'}`}>{item.CI_DEC}</td>
                                                <td className={`px-6 py-4 ${colonnesVisibles.ciHex ? '' : 'hidden'}`}>{item.CI_HEX}</td>
                                                <td className={`px-6 py-4 ${colonnesVisibles.lac ? '' : 'hidden'}`}>{item.LAC}</td>
                                                <td className={`px-6 py-4 ${colonnesVisibles.lacHex ? '' : 'hidden'}`}>{item.LAC_HEX}</td>
                                                <td className={`px-6 py-4 ${colonnesVisibles.technologie ? '' : 'hidden'}`}>{item.Technologie}</td>
                                                <td className={`px-6 py-4 ${colonnesVisibles.bscOmc ? '' : 'hidden'}`}>{item.BSC_OMC}</td>
                                                <td className={`px-6 py-4 ${colonnesVisibles.bsc ? '' : 'hidden'}`}>{item.BSC}</td>
                                                <td className={`px-6 py-4 ${colonnesVisibles.siteStatus ? '' : 'hidden'}`}>{item.Site_Status}</td>
                                                <td className={`px-6 py-4 ${colonnesVisibles.x ? '' : 'hidden'}`}>{item.X}</td>
                                                <td className={`px-6 py-4 ${colonnesVisibles.y ? '' : 'hidden'}`}>{item.Y}</td>
                                                <td className={`px-6 py-4 ${colonnesVisibles.commune ? '' : 'hidden'}`}>{item.COMMUNE}</td>
                                                <td className={`px-6 py-4 ${colonnesVisibles.codeCommune ? '' : 'hidden'}`}>{item.code_commune}</td>
                                                <td className={`px-6 py-4 ${colonnesVisibles.id ? '' : 'hidden'}`}>{item.ID}</td>
                                                <td className={`px-6 py-4 ${colonnesVisibles.wilaya ? '' : 'hidden'}`}>{item.WILAYA}</td>
                                                <td className={`px-6 py-4 ${colonnesVisibles.nature ? '' : 'hidden'}`}>{item.NATURE}</td>
                                                <td className={`px-6 py-4 ${colonnesVisibles.code ? '' : 'hidden'}`}>{item.CODE}</td>
                                                <td className={`px-6 py-4 ${colonnesVisibles.code ? '' : 'hidden'}`}>{item.status === 0 ? "Desactivé" : item.status === 1 ? "Activé" : ""}</td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        className="text-red-600 hover:text-red-900"
                                                        onClick={() => handleSupprimer(item.id_c)}
                                                    >
                                                        Change status
                                                    </button>
                                                    <a href={`/updateCell/${item.id_c}`} className="text-red-600 hover:text-red-900">
                                                        update
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {dialogueSuprimmer && <BoiteDialogue message='Vous voulez vraiment modifier le statut de cette cellule ?' onDialog={onDialogSup} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListeCellules;
