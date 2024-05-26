import React, { useEffect, useState } from 'react'
import NavBarAdmin from '../navBars/navBarAdmin'
import NavBarediteur from '../navBars/navBarEditeur'
import NavBarviewer from '../navBars/navBarViewer'
import Footer from '../composants/Footer';
import axios from 'axios';


const Historique = () => {
  const role = sessionStorage.getItem('role')
 

    const [historique,setHistorique] = useState(null);
    useEffect(()=>{
        axios.get('http://localhost:3002/historique',{headers :{'Authorization': `${sessionStorage.getItem('token')}`}})
                    .then((res) => {
                        setHistorique(res.data);
                        console.log(res.data)
                    }).catch((error) => {
                        console.error('Error fetching users:', error);
                    });
    },[])
        
  return (<>
  {role === '0' ? <NavBarAdmin /> : role === '1' ? <NavBarediteur /> : <NavBarviewer />}
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 mt-24 ">
    <div className="container mx-auto  w-2/3">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Historique de cellules</h2>
        {historique && historique.map((event, index) => (
        <>
          <div key={index} className="py-4 text-center">
          {event.type_event === '1' &&
                <p>
                <b>{event.nom} {event.prenom}</b> a ajouté une nouvelle cellule le {event.date_event}
                </p>
            }
            {event.type_event === '2' &&
                <p>
                <b>{event.nom} {event.prenom}</b> a modifier la cellule <b>{event.id_c}</b> le {event.date_event}
                </p>
            }
            {event.type_event === '3' &&
                <p>
                <b>{event.nom} {event.prenom}</b> a activer/désactiver la cellule <b>{event.id_c}</b> le {event.date_event}
                </p>
            }
          </div>
          <hr></hr>
        </>
        ))}
        
      </div>
    </div>
  </div>
      <Footer/>
  </>
  )
}

export default Historique
