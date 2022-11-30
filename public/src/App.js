//React and React-Router
import React from 'react';
import {
  Routes,
  Route,
  BrowserRouter,
  Link
} from 'react-router-dom';

// Firebase
import { 
  getAuth,
  onAuthStateChanged
} from "firebase/auth";

import authConfig from './authfirebase';

//Components
import Nav from './components/Nav';

//Pages
import Home from './pages/Home';
import CreateAccount from './pages/CreateAccount';
import AllData from './pages/AllData';
import Login from './pages/Login';
import Withdraw from './pages/Withdraw';
import Deposit from './pages/Deposit';
import Balance from './pages/Balance';

import './App.css';


function App() {
  const [session, setSession] = React.useState(false)

  React.useEffect(() => {
    const auth = getAuth(authConfig)
    onAuthStateChanged(auth, user => {
      if(user){
        setSession(true);
      } else {
        setSession(false);
      }
    })
  }, []);

  return (
    <BrowserRouter>
      <Nav/>
      <div className="mt-5 container">
        {

          session ? 
            (
              <Routes>
                <Route path="/" exact element={ <Home/> }/>
                <Route path="/index.html" exact element={ <Home/> }/>
                <Route path="/CreateAccount/" element={ <CreateAccount/> }/>
                <Route path="/alldata/" element={ <AllData/> }/>
                <Route path="/login/" element={ <Login/> }/>
                <Route path="/withdraw/" element={ <Withdraw/> }/>
                <Route path="/deposit/" element={ <Deposit/> }/>
                <Route path="/balance/" element={ <Balance/> }/>
              </Routes>
            ):(
              <div>
                <Routes>
                  <Route path="/" exact element={ <Home/> }/>
                  <Route path="/index.html" exact element={ <Home/> }/>
                  <Route path="/login/" element={ <Login/> }/>
                  <Route path="/CreateAccount/" element={ <CreateAccount/> }/>
                </Routes>
              </div>
            )

        }
      </div>
    </BrowserRouter>
  );
}

export default App;
