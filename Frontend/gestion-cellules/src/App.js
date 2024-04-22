
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ListeUser from './pages/liste_user';
import AddUserPage from './pages/AddUserPage';
import PageConnexion from './pages/PageConnexion';
import NoPage from './pages/noPage';
import AdminAccueil from './pages/Admin_accueil'
import Editeuraccueil from './pages/editeur_acceuil'
import ViewerAccueil from './pages/viewer_accueil'
import UserPage from './pages/userPage'
import FichiersPage from './pages/Fichiers_page'
import CellulesPage from './pages/cellulesPage';
import AddCell from './composants/Add_cell';
import MapPage from './pages/mapPage'
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<PageConnexion/>}/>
        <Route path="/addUser" element={<AddUserPage/>}/>
        <Route path="/addCell" element={<AddCell/>}/>
        <Route path="/listeUser" element={<ListeUser/>}/>
        <Route path="/AdminAccueil" element={<AdminAccueil/>}/>
        <Route path="/editeurAccueil" element={<Editeuraccueil/>}/>
        <Route path="/viewerAccueil" element={<ViewerAccueil/>}/>
        <Route path="/UserPage" element={<UserPage/>}/>
        <Route path="/FichiersPage" element={<FichiersPage/>}/>
        <Route path="/cellulesPage" element={<CellulesPage/>}/>
        <Route path="/map" element={<MapPage/>}/>
        <Route path="*" element={<NoPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>

    );
}

export default App;
