import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import SuccessDialog from './SuccesDialog';


const UpdateCell = () => {
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
    const [messageExist, setMessageExist] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const navigateTo = useNavigate()  

    const annuler = ()=>{
        navigateTo('/cellulesPage')
    }


    const handleCloseSuccessModal = () => {
        navigateTo('/cellulesPage')
        setShowSuccessModal(false);
    };

    const location = useLocation();
    const id_c = location.pathname.split("/")[2];

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3002/updateCell/${id_c}`,{headers :{'Authorization': `${sessionStorage.getItem('token')}`}});
            const data = response.data[0];
            console.log(data)
            // Populate state with fetched data
            setSup(data.SUP);
            setSiteCode(data.Site_Code);
            setSiteLocation(data.Site_location);
            setCellCi(data.Cell_CI);
            setCellName(data.Cell_Name);
            setCiDec(data.CI_DEC);
            setCiHex(data.CI_HEX);
            setLac(data.LAC);
            setLacHex(data.LAC_HEX);
            setTechnologie(data.Technologie);
            setBscOmc(data.BSC_OMC);
            setBsc(data.BSC);
            setSiteStatus(data.Site_Status);
            setX(data.X);
            setY(data.Y);
            setCommune(data.COMMUNE);
            setCodeCommune(data.code_commune);
            setId(data.ID);
            setWilaya(data.WILAYA);
            setNature(data.NATURE);
            setCode(data.CODE);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const userinfo = JSON.parse(sessionStorage.getItem('user'))
    const userId = userinfo.id

    const updateCell = async () => {
        try {
            const resultat = await axios.put(`http://localhost:3002/updateCell/${id_c}/${userId}`, {
                sup,
                siteCode,
                siteLocation,
                cellCi,
                cellName,
                ciDec,
                ciHex,
                lac,
                lacHex,
                technologie,
                bscOmc,
                bsc,
                siteStatus,
                x,
                y,
                commune,
                codeCommune,
                id,
                wilaya,
                nature,
                code,
            },{headers :{'Authorization': `${sessionStorage.getItem('token')}`}});

            if (resultat.data.recu) {
                setShowSuccessModal(true);
            }
            if (resultat.data.message) {
                setMessageExist(true);
            }
        } catch (error) {
            console.error("Error updating data", error);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateCell();
    };


    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 mt-24">
            <div className="container mx-auto w-2/3">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Modifier une cellule </h2>
                    <div className={messageExist ? "" : "hidden"}>
                        <h4 className="bg-red-600 text-white mx-10 rounded-lg text-center">E-mail deja existant !</h4>
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
                                onChange={(e) => setSup(e.target.value)}
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
                                onChange={(e) => setSiteCode(e.target.value)}
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
                                onChange={(e) => setSiteLocation(e.target.value)}
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
                                onChange={(e) => setCellCi(e.target.value)}
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
                                onChange={(e) => setCellName(e.target.value)}
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
                                onChange={(e) => setCiDec(e.target.value)}
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
                                onChange={(e) => setCiHex(e.target.value)}
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
                                onChange={(e) => setLac(e.target.value)}
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
                                onChange={(e) => setLacHex(e.target.value)}
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
                                onChange={(e) => setTechnologie(e.target.value)}
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
                                onChange={(e) => setBscOmc(e.target.value)}
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
                                onChange={(e) => setBsc(e.target.value)}
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
                                onChange={(e) => setSiteStatus(e.target.value)}
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
                                onChange={(e) => setX(e.target.value)}
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
                                onChange={(e) => setY(e.target.value)}
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
                                onChange={(e) => setCommune(e.target.value)}
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
                                onChange={(e) => setCodeCommune(e.target.value)}
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
                                onChange={(e) => setId(e.target.value)}
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
                                onChange={(e) => setWilaya(e.target.value)}
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
                                onChange={(e) => setNature(e.target.value)}
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
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-center ">
                            <button
                                onClick={annuler}
                                className="bg-red-600 text-white p-2 mx-4 rounded-md hover:bg-red-900"
                            >
                                Annuler
                            </button>
                            <button
                                type='submit'
                                className="bg-red-600 text-white p-2 mx-4 rounded-md hover:bg-red-900"
                            >
                                Valider
                            </button>
                        </div>
                    </form>
                    {showSuccessModal && (
                        <SuccessDialog
                            message="Cellule modifiée avec succès !"
                            onClose={handleCloseSuccessModal}
                        />
                    )}

                </div>
            </div>
        </div>
    );
};

export default UpdateCell;
