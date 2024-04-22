import React , { useEffect, useState } from 'react'
import BarreRecherche from './barreRecherche';
import BoiteDialogue from '../composants/boiteDialogue';
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import './ScrollBar.css' 
import axios from 'axios';
const ListeCellules = () => {
    const [rechercheKey,setRechercheKey] = useState("")
    const [initialcells, setInitialcells] = useState([])
    const [cells, setCells] = useState([])
    const [listeVisible, setListeVisible] = useState(false)
    const [dialogueSuprimmer,setDialogueSuprimmer] = useState(false)
    const [dialogueModifier,setDialogueModifier] = useState(false)
    const [deleteId,setDeletedId] =useState(0);
    const [deleted, setDeleted] = useState(true)
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
    const handleSupprimer = (id)=>{
        setDialogueSuprimmer(true)
        setDeletedId(id)
    }
    const handleModifier = (id)=>{
        setDialogueModifier(true)
        setDeletedId(id)
    }
    const onDialogSup =(choix)=>{
        if(choix){
            deleteCell(deleteId)
            setDialogueSuprimmer(false)
        }else{
            setDialogueSuprimmer(false)
        }
    }
    const onDialogModif = (choix)=>{
        if(choix){
            setDialogueModifier(false)
        }else{
            setDialogueModifier(false)
        }
    }
    
    useEffect(()=>{
        if(rechercheKey){
            console.log("recherche declanché")
            console.log(rechercheKey)
            axios.get(`http://localhost:3002/cellulesPage/${rechercheKey}`)
            .then((res)=>{
                console.log(res.data);
                setCells(res.data)
            }).catch((err)=>{
                console.log("Erreur dans la recherche :",err)
            })
        } else{
            console.log("recherche ne marche pas")
            setCells(initialcells)
        }
    },[rechercheKey,initialcells])
    
    useEffect(() => {
        if (deleted) {
            setDeleted(false)
            axios.get('http://localhost:3002/cellulesPage')
                .then((res) => {
                    setInitialcells(res.data);
                    setCells(res.data)
                }).catch((error) => {
                    console.error('Error fetching users:', error);
                });
        }
    }, [deleted]);

    const deleteCell = (id) => {
        console.log("deleteUser est declanché")
        setDeleted(true);
        axios.delete(`http://localhost:3002/cellulesPage/${id}`)
            .catch((error) => {
                console.error('Error deleting user:', error);
            });
    };
    
    


    return (
        <div className='bg-gray-100 min-h-screen min-w-max'>
            <div className='flex flex-col mt-10 p-28 px-6 bg-gray-100'>
                <div className='flex flex-row '>
                    <BarreRecherche value={rechercheKey} setValue={setRechercheKey}/>
                    <a href='/' >
                    <button >
                        <div className=' bg-red-600 hover:bg-red-900 flex items-center justify-center w-16 rounded-md text-2xl text-white  p-3 mr-12'>
                            <FaPlus />
                        </div>
                    </button>
                    </a>
                    <div>
                    <button onClick={toggleListe}>
                        <div className=' bg-red-600 hover:bg-red-900 flex items-center justify-center w-16 rounded-md text-2xl text-white p-3 mr-12'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                            </svg>
                            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </button>
    {listeVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg max-h-80 w-64 overflow-y-auto flex flex-col">
                <button className="self-end text-lg" onClick={toggleListe}>
                    <IoMdClose />
                </button>
                {Object.entries(colonnesVisibles).map(([key, value]) => (
                    <div key={key} className="flex items-center">
                        <input
                            type="checkbox"
                            id={key}
                            value={key}
                            checked={value}
                            onChange={(e) => handleToggleColonne(e.target.value)}
                            className="form-checkbox h-5 w-5 text-indigo-600"
                        />
                        <label htmlFor={key} className="ml-2">{key}</label>
                    </div>
                ))}
            </div>
        </div>
    )}
</div>
</div>
            <div className="bg-gray-100 flex items-center justify-center overflow-x-auto">
                <div className="container mx-auto flex-col " >
                    <div className='flex '>
                    <table className="w-full border-collapse m-10 rounded-lg shadow-md overflow-hidden ">
                        <thead className='bg-red-600'>
                            <tr>
                                {Object.entries(colonnesVisibles).map(([cle, valeur]) => (
                                    valeur && <th key={cle} className="px-6 py-3 text-center text-xs font-medium text-white uppercase">{cle}</th>
                                ))}
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
                                        <td className="px-6 py-4">
                                            <button
                                                className="text-red-600 hover:text-red-900"
                                                onClick={()=>handleSupprimer(item.id_c)}
                                            >
                                                Supprimer
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-900"
                                                onClick={()=>handleModifier(item.id_c)}
                                            >
                                                Modifier
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {dialogueSuprimmer && <BoiteDialogue message='Vous voulez vraiment supprimer cette cellule ?' onDialog={onDialogSup}/>}
                {dialogueModifier && <BoiteDialogue message='Vous voulez vraiment modifier cette cellule ?' onDialog={onDialogModif}/>}
                </div>
            </div>
        </div>
    </div>
  );
};
    

export default ListeCellules
