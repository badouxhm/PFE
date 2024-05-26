
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
import CellulesViewer from './pages/celuulesViewer';
import AddCell from './pages/AddCellPage';
import MapPage from './pages/mapPage'
import UpdateCell from './pages/updateCellPage';
import UpdateUser from './pages/updateUserPage';
import Historique from './pages/historique';
import ProtectedRoute from './protectedRoute';

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<PageConnexion/>}/>
        
        <Route path="/listeUser" element={
            <ProtectedRoute  allowedRoles={['admin']}>
              <ListeUser />
            </ProtectedRoute>
          } />
        <Route path="/addUser" element={
            <ProtectedRoute  allowedRoles={['admin']}>
              <AddUserPage />
            </ProtectedRoute>
          } />
        <Route path="/updateUser/:id" element={
            <ProtectedRoute  allowedRoles={['admin']}>
              <UpdateUser/>
            </ProtectedRoute>  
          }/>
        <Route path="/cellulesPage" element={
            <ProtectedRoute  allowedRoles={['admin','editeur','viewer']}>
              <CellulesPage/>
            </ProtectedRoute>
          }/>
        <Route path="/cellulesViewer" element={
            <ProtectedRoute  allowedRoles={['viewer']}>
              <CellulesViewer/>
            </ProtectedRoute>
          }/>
        <Route path="/addCell" element={
            <ProtectedRoute allowedRoles={['admin','editeur']}>
              <AddCell/>
            </ProtectedRoute>  
          }/>
        <Route path="/updateCell/:id" element={
            <ProtectedRoute allowedRoles={['admin','editeur']}>
              <UpdateCell/>
              </ProtectedRoute>  
          }/>
        <Route path="/FichiersPage" element={
            <ProtectedRoute allowedRoles={['admin','editeur']}>
              <FichiersPage/>
            </ProtectedRoute>    
          }/>
        <Route path="/historique" element={
            <ProtectedRoute allowedRoles={['admin','editeur']}>
              <Historique/>
            </ProtectedRoute>  
          }/>
        
        <Route path="/AdminAccueil" element={
            <ProtectedRoute allowedRoles={['admin']}>
             <AdminAccueil/>
            </ProtectedRoute>
          }/>
        <Route path="/editeurAccueil" element={
            <ProtectedRoute allowedRoles={['editeur']}>
              <Editeuraccueil/>
            </ProtectedRoute>
        }/>
        <Route path="/viewerAccueil" element={
            <ProtectedRoute allowedRoles={['viewer']}>
              <ViewerAccueil/>
            </ProtectedRoute>}/>

        <Route path="/UserPage" element={
            <ProtectedRoute allowedRoles={['admin','editeur','viewer']}>
              <UserPage/>
            </ProtectedRoute>}/>
            
        <Route path="/map" element={
            <ProtectedRoute allowedRoles={['admin','editeur','viewer']}>
              <MapPage/>
            </ProtectedRoute>}/>

        <Route path="*" element={<NoPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>

    );
}

export default App;
