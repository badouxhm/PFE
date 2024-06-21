/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import BarreRecherche from './barreRecherche';
import { LiaAngleLeftSolid } from "react-icons/lia";
import { LiaAngleRightSolid } from "react-icons/lia";
import { FiChevronsRight } from "react-icons/fi";
import { FiChevronsLeft } from "react-icons/fi";
import './ScrollBar.css';
import axios from 'axios';

const ListeCellules = () => {
    const [rechercheKey, setRechercheKey] = useState("");
    const [initialcells, setInitialcells] = useState([]);
    const [cells, setCells] = useState([]);
    const [listeVisible, setListeVisible] = useState(false);
    const [deleted, setDeleted] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 30 ;
    const lastIndex = currentPage * recordsPerPage ;
    const firstIndex = lastIndex - recordsPerPage ;
    const records = cells.slice(firstIndex,lastIndex)
    const npage = Math.ceil(cells.length/recordsPerPage) 

    const generatePageNumbers = () => {
        
        const current = currentPage;
        const last = npage;
        const delta = 2;
        const left = current - delta;
        const right = current + delta + 1;
        let pages = [];
        let page;

        for (let i = 1; i <= last; i++) {
            if (i === 1 || i === last || (i >= left && i < right)) {
                page = i;
                pages.push(page);
            }
        }

        return pages;
    };


    const prePage = ()=>{
        if(currentPage !== firstIndex){
            setCurrentPage(currentPage - 1)
        }
    }
    const pre10Page = ()=>{
        if(currentPage !== firstIndex){
            setCurrentPage(1)
        }
    }
    const nextPage = ()=>{
        if(currentPage !== firstIndex){
            setCurrentPage(currentPage + 1)
        }
    }
    const next10Page = ()=>{
        if(currentPage !== firstIndex){
            setCurrentPage(npage)
        }
    }
    const changeCpage = (n)=>{
        setCurrentPage(n);
    }

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


    useEffect(() => {
        if (rechercheKey) {
            axios.get(`http://localhost:3002/cellulesPage/${rechercheKey}`,{headers :{'Authorization': `${sessionStorage.getItem('token')}`}},)
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
            axios.get('http://localhost:3002/cellulesPage',{headers: {
                'Authorization': `${sessionStorage.getItem('token')}`
              }})
                .then((res) => {
                    setInitialcells(res.data);
                    setCells(res.data);
                    setDeleted(false);
                }).catch((error) => {
                    console.error('Error fetching users:', error);
                });
        }
    }, [deleted]);



    return (
        <div className='bg-gray-100 min-h-screen min-w-max'>
            <div className='flex flex-col mt-10 p-28 px-2 bg-gray-100'>
                <div className='flex flex-row '>
                    <BarreRecherche value={rechercheKey} setValue={setRechercheKey}/>
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
                <div className="bg-gray-100 flex justify-start overflow-x-scroll">
                    <div className="container">
                        <div className='w-0'>
                            <table className="w-full border-collapse mt-20 m-5 rounded-lg shadow-md overflow-hidden ">
                                <thead className='bg-red-600'>
                                    <tr>
                                        {Object.entries(colonnesVisibles).map(([cle, valeur]) => (
                                            valeur && <th key={cle} className="px-6 py-3 text-center text-xs font-medium text-white uppercase">{cle}</th>
                                        ))}
                                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">status</th>
                                        
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {records.length === 0 ? (
                                        <tr>
                                            <td colSpan="26" className="px-6 py-3 text-center">Pas de cellules</td>
                                        </tr>
                                    ) : (
                                        records.map((item) => (
                                            <tr key={item.id_c}>
                                                <td className={`px-6 py-4 ${colonnesVisibles.id_c ? '' : 'hidden'}`}>{item.id_c}</td>
                                                <td className={`px-6 py-4 ${colonnesVisibles.sup ? '' : 'hidden'}`}>{item.SUP}</td>
                                                <td className={`px-6 py-4 ${colonnesVisibles.siteCode ? '' : 'hidden'}`}>{item.Site_Code}</td>
                                                <td className={`px-6 py-4 ${colonnesVisibles.siteLocation ? '' : 'hidden'}`}>{item.Site_location}</td>
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
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                            <div className='flex flex-row '>
                                <nav className="flex justify-center mx-auto my-8 p sticky">
                                    <ul className="flex space-x-4">
                                        <li className='text-center flex flex-col items-center rounded-md text-xl text-gray-700 px-2'>
                                            <a href='#' onClick={pre10Page} className="mt-2 text-gray-700"><FiChevronsLeft /></a>
                                        </li>
                                        <li className='text-center flex flex-col items-center rounded-md text-xl text-gray-700 px-2'>
                                            <a href='#' onClick={prePage} className="mt-2 text-gray-700"><LiaAngleLeftSolid /></a>
                                        </li>
                                        {generatePageNumbers().map((n, i) => (
                                            <li key={i} className={`w-4 mt-1 px-4 ${currentPage === n ? ' text-red-500 hover:text-red-900  text-center rounded ':'text-black'}`}>
                                                <a href='#' onClick={() => changeCpage(n)} className={`mt-2 ${currentPage === n ? ' bg-red-600 hover:bg-red-900  text-center rounded  text-white':'text-black'}`}>{n}</a>
                                            </li>
                                        ))}
                                        <li className='text-center flex flex-col items-center rounded-md text-xl text-gray-700 px-2'>
                                            <a href='#' onClick={nextPage} className="mt-2 text-gray-700"><LiaAngleRightSolid /></a>
                                        </li>
                                        <li className='text-center flex flex-col items-center rounded-md text-xl text-gray-700 px-2'>
                                            <a href='#' onClick={next10Page} className="mt-2 text-gray-700"><FiChevronsRight /></a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
            </div>
        </div>
    );
};

export default ListeCellules;
