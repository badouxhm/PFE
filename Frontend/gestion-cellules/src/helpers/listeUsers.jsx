import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RiUserAddLine } from "react-icons/ri";
import { GoPencil } from "react-icons/go";
import { RiUserForbidLine } from "react-icons/ri";

import BoiteDialogue from '../composants/boiteDialogue';
import BarreRecherche from '../composants/barreRecherche';
const Liste = () => {
    const [InitialData, setInitialData] = useState([])
    const [data,setData] = useState([])
    const [deleted, setDeleted] = useState(true)
    const [dialogue,setDialogue] = useState(false)
    const [rechercheKey,setRechercheKey] = useState('')
    const [deleteId,setDeletedId] =useState(0);
    
    useEffect(()=>{
        if(rechercheKey){
            console.log("recherche declanché")
            console.log(rechercheKey)
            axios.get(`http://localhost:3002/listeUser/${rechercheKey}`,{headers :{'Authorization': `${sessionStorage.getItem('token')}`}})
            .then((res)=>{
                setData(res.data)
            }).catch((err)=>{
                console.log("Erreur dans la recherche :",err)
            })
        } else{
            setData(InitialData)
        }
    },[rechercheKey,InitialData])
    
    useEffect(() => {
        if (deleted) {
            setDeleted(false)
            axios.get('http://localhost:3002/listeUser',{headers :{'Authorization': `${sessionStorage.getItem('token')}`}})
                .then((res) => {
                    setInitialData(res.data);
                    setData(res.data)
                }).catch((error) => {
                    console.error('Error fetching users:', error);
                });
        }
    }, [deleted]);
    
    
    const deleteUser = (id) => {
        console.log("deleteUser est déclenché");
        setDeleted(true);
        axios.delete(
            `http://localhost:3002/listeUser/${id}`,{headers :{'Authorization': `${sessionStorage.getItem('token')}`}}
        ).catch((error) => {
            console.error('Error deleting user:', error);
        });
    };
    
        
    const handleSupprimer = (id)=>{
        setDialogue(true)
        setDeletedId(id)
    }
    const onDialog =(choix)=>{
        if(choix){
            deleteUser(deleteId)
            setDialogue(false)
        }else{
            setDialogue(false)
        }

    }

  return (
    <div className='bg-gray-100 min-h-screen'>
        <div className='flex flex-col mt-10 p-28 bg-gray-100 '>
            <div className='flex flex-row '>
                <BarreRecherche value={rechercheKey} setValue={setRechercheKey}   />
                <a href='/addUser' >
                <button >
                    <div className=' bg-red-600 hover:bg-red-900 flex items-center justify-center w-32 rounded-md text-2xl text-white  p-3 mr-12'>
                        <RiUserAddLine />
                    </div>
                </button>
                </a>
            </div>
            <div className="bg-gray-100 flex items-center justify-center ralative">
                <div className="container mx-auto flex-col " >
                    <div className='flex'>
                    <table className="w-full border-collapse m-10 rounded-lg shadow-md overflow-hidden ">
                        <thead className="bg-red-600 ">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase">
                            ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase">
                            matricule
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase">
                            Nom
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase">
                            Prénom
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase">
                            Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase">
                            N° Tel
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase">
                            Role
                            </th> 
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase">
                            poste
                            </th> 
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase">
                            Status
                            </th> 
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase">
                            Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {data.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-3 text-center">Pas d'utilisateur</td>
                                            </tr>
                                        ) : (
                                            data.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="px-6 py-4 ">{item.id}</td>
                                                    <td className="px-6 py-4 ">{item.matricule}</td>
                                                    <td className="px-6 py-4 ">{item.nom}</td>
                                                    <td className="px-6 py-4 ">{item.prenom}</td>
                                                    <td className="px-6 py-4 ">{item.email}</td>
                                                    <td className="px-6 py-4 ">+213 {item.tel}</td>
                                                    <td className="px-6 py-4 ">  {item.role === 0 ? "admin" : item.role === 1 ? "editeur" : item.role === 2 ? "viewer" : ""}</td>
                                                    <td className="px-6 py-4 ">{item.poste}</td>
                                                    <td className="px-6 py-4 ">{item.status === 0 ? "Desactivé" : item.status === 1 ? "Activé" : ""}</td>
                                                    <td className="px-6 py-4 ">
                                                    <div className='flex flex-row'>
                                                        <button
                                                            className="text-xl mx-2 text-red-600 hover:text-red-900"
                                                            onClick={() => handleSupprimer(item.id)}
                                                        >
                                                            <RiUserForbidLine />
                                                        </button>
                                                        <a href={`/updateUser/${item.id}`} className="text-xl mx-2 text-red-600 hover:text-red-900">
                                                            <GoPencil />
                                                        </a>
                                                    </div>
                                                    </td>

                                                </tr>
                                            ))
                                        )} 
                        </tbody>
                    </table>
                </div>
                {dialogue && <BoiteDialogue message='Vous voulez vraiment changer le status de l`utilisateur ?' onDialog={onDialog}/>}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Liste;