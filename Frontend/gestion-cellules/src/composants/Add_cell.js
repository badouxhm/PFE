import React, { useState } from 'react'
import axios from 'axios';
import SuccessDialog from './boiteDialogue';
import Succes from './SuccesDialog';

import { useNavigate } from 'react-router-dom';

const Add_cell = () => {

    const [sup, setSup] = useState('');
    const [siteCode, setSiteCode] = useState('');
    const [siteLocation, setSiteLocation] = useState('');
    const [cellCi, setCellCi] = useState('');
    const [cellName, setCellName] = useState('');
    const [ciDec, setCiDec] = useState('');
    const [ciHex, setCiHex] = useState('');
    const [lac, setLac] = useState('');
    const [lacHex, setLacHex] = useState('');
    const [technologie, setTechnologie] = useState('');
    const [bscOmc, setBscOmc] = useState('');
    const [bsc, setBsc] = useState('');
    const [siteStatus, setSiteStatus] = useState('');
    const [x, setX] = useState('');
    const [y, setY] = useState('');
    const [commune, setCommune] = useState('');
    const [codeCommune, setCodeCommune] = useState('');
    const [id, setId] = useState('');
    const [wilaya, setWilaya] = useState('');
    const [nature, setNature] = useState('');
    const [code, setCode] = useState('');
    const [MessageExist,setMessageExist] = useState(false)
    const [dialogue, setDialogue] = useState(false);
    const [succes, setSucces] = useState(false);

    const navigateTo = useNavigate()  

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setDialogue(true);
    };

    const handleCloseSuccessModal = (choix) => {
        setDialogue(false);
        if (choix) {
            createCell();
        }
    };
    const userinfo = JSON.parse(sessionStorage.getItem('user'))
    const userId = userinfo.id
    const createCell =(e)=>{
        if(e){
            e.preventDefault();
        }
    axios.post(`http://localhost:3002/addCell/${userId}`,{
      sup : sup,
      siteCode : siteCode,
      siteLocation : siteLocation,
      cellCi : cellCi,
      cellName : cellName,
      ciDec : ciDec,
      ciHex : ciHex,
      lac : lac,
      lacHex : lacHex,
      technologie : technologie,
      bscOmc : bscOmc,
      bsc : bsc,
      siteStatus : siteStatus,
      x : x,
      y : y,
      commune : commune,
      codeCommune : codeCommune,
      id : id,
      wilaya : wilaya,
      nature : nature,
      code : code,
    },{headers :{'Authorization': `${sessionStorage.getItem('token')}`}}
    ).then((resultat)=>{
      if (resultat.data.message){
        console.log(resultat.data)
        setMessageExist(true)
      }else{
        setSucces(true)
      }
    })
  }
  const handleCloseSuccess = () => {
    setSucces(false);
    navigateTo('/cellulesPage');
  };
  
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 mt-24">
            <div className="container mx-auto w-2/3">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Ajouter une cellule</h2>
                    <div className= {MessageExist ? "h-10" : "hidden h-10" }>
                      <h4 className='bg-red-600 mx-10 text-white  rounded-lg text-center text-xl'>Cellule deja existante !</h4>
                    </div>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <label htmlFor="sup" className="block text-sm font-medium text-gray-600">
                                Sup
                            </label>
                            <input
                                type="text"
                                id="sup"
                                name="sup"
                                required
                                className="mt-1 p-2 w-full border rounded-md"
                                value={sup}
                                onChange={(e) => { setSup(e.target.value) }}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="siteCode" className="block text-sm font-medium text-gray-600">
                                Site Code
                            </label>
                            <input
                                type="text"
                                id="siteCode"
                                name="siteCode"
                                required
                                className="mt-1 p-2 w-full border rounded-md"
                                value={siteCode}
                                onChange={(e) => { setSiteCode(e.target.value) }}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="siteLocation" className="block text-sm font-medium text-gray-600">
                                Site Location
                            </label>
                            <input
                                type="text"
                                id="siteLocation"
                                name="siteLocation"
                                required
                                className="mt-1 p-2 w-full border rounded-md"
                                value={siteLocation}
                                onChange={(e) => { setSiteLocation(e.target.value) }}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="cellCi" className="block text-sm font-medium text-gray-600">
                                Cell Ci
                            </label>
                            <input
                                type="text"
                                id="cellCi"
                                name="cellCi"
                                required
                                className="mt-1 p-2 w-full border rounded-md"
                                value={cellCi}
                                onChange={(e) => { setCellCi(e.target.value) }}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="cellName" className="block text-sm font-medium text-gray-600">
                                Cell Name
                            </label>
                            <input
                                type="text"
                                id="cellName"
                                name="cellName"
                                required
                                className="mt-1 p-2 w-full border rounded-md"
                                value={cellName}
                                onChange={(e) => { setCellName(e.target.value) }}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="ciDec" className="block text-sm font-medium text-gray-600">
                            ciDec
                            </label>
                            <input
                                type="text"
                                id="ciDec"
                                name="ciDec"
                                required
                                className="mt-1 p-2 w-full border rounded-md"
                                value={ciDec}
                                onChange={(e) => { setCiDec(e.target.value) }}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="ciHex" className="block text-sm font-medium text-gray-600">
                            ciHex
                            </label>
                            <input
                                type="text"
                                id="ciHex"
                                name="ciHex"
                                required
                                className="mt-1 p-2 w-full border rounded-md"
                                value={ciHex}
                                onChange={(e) => { setCiHex(e.target.value) }}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lac" className="block text-sm font-medium text-gray-600">
                            lac
                            </label>
                            <input
                                type="text"
                                id="lac"
                                name="lac"
                                required
                                className="mt-1 p-2 w-full border rounded-md"
                                value={lac}
                                onChange={(e) => { setLac(e.target.value) }}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lacHex" className="block text-sm font-medium text-gray-600">
                            lacHex
                            </label>
                            <input
                                type="text"
                                id="lacHex"
                                name="lacHex"
                                required
                                className="mt-1 p-2 w-full border rounded-md"
                                value={lacHex}
                                onChange={(e) => { setLacHex(e.target.value) }}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="technologie" className="block text-sm font-medium text-gray-600">
                            technologie
                            </label>
                            <input
                                type="text"
                                id="technologie"
                                name="technologie"
                                required
                                className="mt-1 p-2 w-full border rounded-md"
                                value={technologie}
                                onChange={(e) => { setTechnologie(e.target.value) }}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="bscOmc" className="block text-sm font-medium text-gray-600">
                            bscOmc
                            </label>
                            <input
                                type="text"
                                id="bscOmc"
                                name="bscOmc"
                                required
                                className="mt-1 p-2 w-full border rounded-md"
                                value={bscOmc}
                                onChange={(e) => { setBscOmc(e.target.value) }}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="bsc" className="block text-sm font-medium text-gray-600">
                                bsc
                            </label>
                            <input
                                type="text"
                                id="bsc"
                                name="bsc"
                                required
                                className="mt-1 p-2 w-full border rounded-md"
                                value={bsc}
                                onChange={(e) => { setBsc(e.target.value) }}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="siteStatus" className="block text-sm font-medium text-gray-600">
                                site status
                            </label>
                            <input
                                type="text"
                                id="siteStatus"
                                name="siteStatus"
                                required
                                className="mt-1 p-2 w-full border rounded-md"
                                value={siteStatus}
                                onChange={(e) => { setSiteStatus(e.target.value) }}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="x" className="block text-sm font-medium text-gray-600">
                                x
                            </label>
                            <input
                                type="text"
                                id="x"
                                name="x"
                                required
                                className="mt-1 p-2 w-full border rounded-md"
                                value={x}
                                onChange={(e) => { setX(e.target.value) }}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="y" className="block text-sm font-medium text-gray-600">
                                y
                            </label>
                            <input
                                type="text"
                                id="y"
                                name="y"
                                required
                                className="mt-1 p-2 w-full border rounded-md"
                                value={y}
                                onChange={(e) => { setY(e.target.value) }}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="commune" className="block text-sm font-medium text-gray-600">
                            commune
                            </label>
                            <input
                                type="text"
                                id="commune"
                                name="commune"
                                required
                                className="mt-1 p-2 w-full border rounded-md"
                                value={commune}
                                onChange={(e) => { setCommune(e.target.value) }}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="codeCommune" className="block text-sm font-medium text-gray-600">
                            codeCommune
                            </label>
                            <input
                                type="text"
                                id="codeCommune"
                                name="codeCommune"
                                required
                                className="mt-1 p-2 w-full border rounded-md"
                                value={codeCommune}
                                onChange={(e) => { setCodeCommune(e.target.value) }}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="id" className="block text-sm font-medium text-gray-600">
                                id
                            </label>
                            <input
                                type="text"
                                id="id"
                                name="id"
                                required
                                className="mt-1 p-2 w-full border rounded-md"
                                value={id}
                                onChange={(e) => { setId(e.target.value) }}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="wilaya" className="block text-sm font-medium text-gray-600">
                                wilaya
                            </label>
                            <input
                                type="text"
                                id="wilaya"
                                name="wilaya"
                                required
                                className="mt-1 p-2 w-full border rounded-md"
                                value={wilaya}
                                onChange={(e) => { setWilaya(e.target.value) }}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="nature" className="block text-sm font-medium text-gray-600">
                            nature
                            </label>
                            <input
                                type="text"
                                id="nature"
                                name="nature"
                                required
                                className="mt-1 p-2 w-full border rounded-md"
                                value={nature}
                                onChange={(e) => { setNature(e.target.value) }}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="code" className="block text-sm font-medium text-gray-600">
                                code
                            </label>
                            <input
                                type="text"
                                id="code"
                                name="code"
                                required
                                className="mt-1 p-2 w-full border rounded-md"
                                value={code}
                                onChange={(e) => { setCode(e.target.value) }}
                            />
                        </div>
                        
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-red-600 text-white p-2 rounded-md hover:bg-red-900"
                            >
                                Valider
                            </button>
                        </div>
                    </form>
                    {dialogue && (
                    <SuccessDialog
                    message="Vous voulez vraimment ajouter cette cellule ?"
                    onDialog={handleCloseSuccessModal}
                    />
                )}
                {succes && (
            <Succes
              message="cellule ajouté avec succès"
              onClose={handleCloseSuccess}
            />
          )}
                </div>
            </div>
        </div>
    );
};


export default Add_cell
