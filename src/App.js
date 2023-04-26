import { Navigate, RouterProvider, createHashRouter} from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/SignUp/Signup';
import All from './components/All/All';
import Pc from './components/Platforms/Pc/Pc';
import GameBrowser from './components/Platforms/Browser/GameBroser';
import RealaseDate from './components/SortBy/ReleaseDate/RealaseDate';
import Popularity from './components/SortBy/Popularity/Popularity';
import Alphapetical from './components/SortBy/Alphapetical/Alphapetical';
import Relevence from './components/SortBy/Relevence/Relevence';
import Racing from './components/Categories/Racing/Racing';
import Sports from './components/Categories/Sports/Sports';
import Social from './components/Categories/Social/Social';
import Shooter from './components/Categories/Shooter/Shooter';
import OpenWorld from './components/Categories/Open-world/OpenWorld';
import Zombie from './components/Categories/Zombie/Zombie';
import Fantazy from './components/Categories/Fantazy/Fantazy';
import ActionRpg from './components/Categories/Action-rpg/ActionRpg';
import Action from './components/Categories/Action/Action';
import Flight from './components/Categories/Flight/Flight';
import BattleRoyal from './components/Categories/Battle-Royal/BattleRoyal';
import GameDetailes from './components/GameDetailes/GameDetailes';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';




function App() {
  const [curUser, setcurUser] = useState(null);

  
  function getUserData(){
    const userData = jwtDecode(localStorage.getItem('tkn'));
    setcurUser(userData);
  }

  function clearUserData(){
    localStorage.removeItem('tkn');
    setcurUser(null);
  }

  useEffect(function(){
      if(localStorage.getItem('tkn') != null && curUser == null){
        getUserData();
      }
  },[]);

  function ProtectedRoutes({children}){

    if(localStorage.getItem('tkn') == null){
      return <>
      <Navigate to='/login'/>
      {setTimeout(() => {
        alert('you must loged in first');
      }, 500)}
      </> 
    }else{
      return <>
        {children}
      </>;
    }
  }

  function ProtectedRoutes2({children}){

    if(localStorage.getItem('tkn') != null){
      return <>
      <Navigate to='/home'/>
      {setTimeout(() => {
        alert('you are already loged in');
      }, 500)}
      </> 
    }else{
      return <>
        {children}
      </>;
    }

}

 


  const router = createHashRouter([
    {path:'',element:<Layout curUser={curUser} clearUserData={clearUserData}/>,children:[
      {path:'',element:<ProtectedRoutes2><Login getUserData={getUserData}/></ProtectedRoutes2>},
      {path:'home',element:<ProtectedRoutes><Home/></ProtectedRoutes>},
      {path:'all',element:<ProtectedRoutes><All/></ProtectedRoutes>},
      {path:'platform/pc',element:<ProtectedRoutes><Pc/></ProtectedRoutes>},
      {path:'platform/browser',element:<ProtectedRoutes><GameBrowser/></ProtectedRoutes>},
      {path:'sort-by/release-date',element:<ProtectedRoutes><RealaseDate/></ProtectedRoutes>},
      {path:'sort-by/popularity',element:<ProtectedRoutes><Popularity/></ProtectedRoutes>},
      {path:'sort-by/alphabetical',element:<ProtectedRoutes><Alphapetical/></ProtectedRoutes>},
      {path:'sort-by/relevance',element:<ProtectedRoutes><Relevence/></ProtectedRoutes>},
      {path:'categories/racing',element:<ProtectedRoutes><Racing/></ProtectedRoutes>},
      {path:'categories/sports',element:<ProtectedRoutes><Sports/></ProtectedRoutes>},
      {path:'categories/social',element:<ProtectedRoutes><Social/></ProtectedRoutes>},
      {path:'categories/shooter',element:<ProtectedRoutes><Shooter/></ProtectedRoutes>},
      {path:'categories/zombie',element:<ProtectedRoutes><Zombie/></ProtectedRoutes>},
      {path:'categories/fantasy',element:<ProtectedRoutes><Fantazy/></ProtectedRoutes>},
      {path:'categories/action-rpg',element:<ProtectedRoutes><ActionRpg/></ProtectedRoutes>},
      {path:'categories/action',element:<ProtectedRoutes><Action/></ProtectedRoutes>},
      {path:'categories/flight',element:<ProtectedRoutes><Flight/></ProtectedRoutes>},
      {path:'categories/open-world',element:<ProtectedRoutes><OpenWorld/></ProtectedRoutes>},
      {path:'categories/battle-royal',element:<ProtectedRoutes><BattleRoyal/></ProtectedRoutes>},
      {path:'game-detailes/:id',element:<ProtectedRoutes><GameDetailes/></ProtectedRoutes>},
      {path:'login',element:<ProtectedRoutes2><Login getUserData={getUserData}/></ProtectedRoutes2>},
      {path:'signup',element:<ProtectedRoutes2><Signup/></ProtectedRoutes2>},
      {path:'*',element:<><div className='vh-100 d-flex justify-content-center align-items-center text-light'><h2>Erorr 4 0 4 .</h2></div></>},
  
  
    ]}
  ])
  return <>
    <RouterProvider router={router}/>
  </>;
}

export default App;
