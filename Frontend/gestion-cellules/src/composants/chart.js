import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, BarElement, LinearScale } from 'chart.js';
import axios from 'axios';
import './mapChart.css';
import 'leaflet/dist/leaflet.css';
import MapAcc from '../pages/mapAcc';

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, BarElement, LinearScale);

const ChartT = () => {
  const [dataT, setDataT] = useState([]);
  const [dataS, setDataS] = useState([]);
  const [dataStatus, setDataStatus] = useState([]);
  const [nombreCells, setNombreCells] = useState('0');
  const [Wilaya, setWilaya] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [techRes, supRes, statusRes, nombreCellsRes, wilayaRes] = await Promise.all([
          axios.get('http://localhost:3002/chartTechnologie', { headers: { 'Authorization': `${sessionStorage.getItem('token')}` } }),
          axios.get('http://localhost:3002/chartSup', { headers: { 'Authorization': `${sessionStorage.getItem('token')}` } }),
          axios.get('http://localhost:3002/chartStatus', { headers: { 'Authorization': `${sessionStorage.getItem('token')}` } }),
          axios.get('http://localhost:3002/NombreCells', { headers: { 'Authorization': `${sessionStorage.getItem('token')}` } }),
          axios.get('http://localhost:3002/Wilaya', { headers: { 'Authorization': `${sessionStorage.getItem('token')}` } }),
        ]);

        setDataT(techRes.data);
        setDataS(supRes.data);
        setDataStatus(statusRes.data);
        setNombreCells(nombreCellsRes.data);
        setWilaya(wilayaRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartDataT = {
    labels: dataT.map((item) => item.Technologie),
    datasets: [
      {
        label: 'Technologie de Cellules',
        data: dataT.map((item) => item.NbrCells),
        backgroundColor: [
          'rgba(187, 45, 12, 1)',
          'rgba(217, 243, 228, 1)',
          'rgba(117, 187, 153, 1)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 69, 0, 0.8)',
          'rgba(255, 0, 0, 0.8)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartDataS = {
    labels: dataS.map((item) => item.SUP),
    datasets: [
      {
        label: 'Fournisseur de Cellules',
        data: dataS.map((item) => item.SupCells),
        backgroundColor: [
          'rgba(187, 45, 12, 1)',
          'rgba(217, 243, 228, 1)',
          'rgba(117, 187, 153, 1)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 69, 0, 0.8)',
          'rgba(255, 0, 0, 0.8)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartDataStatus = {
    labels: ['active', 'inactive'],
    datasets: [
      {
        label: 'Status de Cellules',
        data: dataStatus.map((item) => item.StatusCells),
        backgroundColor: [
          'rgba(187, 45, 12, 1)',
          'rgba(117, 187, 153, 1)',
        ],
        borderColor: [
          'rgba(255, 0, 0, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 69, 0, 0.8)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: Wilaya.map((item) => item.name),
    datasets: [
      {
        label: 'Nombre de Cellules par Wilaya',
        data: Wilaya.map((item) => item.nbcelles),
        backgroundColor: [
          'rgba(187, 45, 12, 1)',
          'rgba(117, 187, 153, 1)',
        ],
        borderColor: [
          'rgba(255, 0, 0, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 69, 0, 0.8)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto mt-32">
      {/* Nouvelle ligne pour le texte */}
      <div className="mt-8 bg-slate-100 rounded-lg p-4 text-center mb-4">
        <b className="text-3xl text-red-500">
          Le nombre total des Cellules : {nombreCells[0].NombreCells}
        </b>
      </div>
      {/* Première section avec la carte et les trois Pie charts */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-full lg:min-w-0 lg:w-1/2 bg-slate-100 rounded-lg p-4">
          <MapAcc />
        </div>
        <div className="flex flex-col lg:flex-row flex-1 gap-4">
          <div className="bg-slate-100 rounded-lg p-4 flex-1">
            <h1 className="text-center text-red-500 text-2xl mb-4">Technologie de Cellule</h1>
            {dataT.length > 0 ? (
              <Pie data={chartDataT} />
            ) : (
              <p>Chargement...</p>
            )}
          </div>
          <div className="bg-slate-100 rounded-lg p-4 flex-1">
            <h1 className="text-center text-red-500 text-2xl mb-4">Fournisseur de Cellule</h1>
            {dataS.length > 0 ? (
              <Pie data={chartDataS} />
            ) : (
              <p>Chargement...</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Deuxième section avec le Bar chart */}
      <div className="mt-8 bg-slate-100 rounded-lg p-4 mb-4">
        <h1 className="text-center text-red-500 text-2xl mb-4">Nombre de Cellules par Wilaya</h1>
        {Wilaya.length > 0 ? (
          <Bar data={barData} />
        ) : (
          <p>Chargement...</p>
        )}
      </div>
    </div>
  );
};

export default ChartT;
