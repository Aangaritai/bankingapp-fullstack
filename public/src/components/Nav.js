import React from 'react';
import { Link } from 'react-router-dom';
import { 
  getAuth,
  onAuthStateChanged
} from 'firebase/auth';

import conf from '../conf-firebase.js'

function Nav() {
  const [show, setShow] = React.useState(false);
  const body = document.querySelector('body');
  const wscreen = body.clientWidth >= 1024;
  const auth = getAuth(conf)
  const user = auth.currentUser

  React.useEffect(() => {
    const auth = getAuth(conf)
    onAuthStateChanged(auth, user => {
      if(user){
        setShow(true);
      } else {
        setShow(false);
      }
    })
  }, []);

  function activeToggle(e){
    let id = e.currentTarget.id
    let elm = document.querySelector('.nav-link.active');
    elm.classList.remove("active");

    let a = document.getElementById(id);
    if(a.className === 'nav-link'){
      a.className = 'nav-link active';
    }     
  }

  function hoverToggle(e){
    if(!wscreen) return;
    let id = `${e.currentTarget.id}-hover`;
    let elmHover = document.getElementById(id);
    elmHover.className = 'dropdown-menu show';
  }

  function hoverToggleOut(e){
    if(!wscreen) return;
    let id = `${e.currentTarget.id}-hover`;
    let elmHover = document.getElementById(id);
    elmHover.className = 'dropdown-menu';
  }

  return (
    <nav className="navbar navbar-dark bg-dark flex-column align-items-center navbar-expand-lg border-bottom ">
      <a className="navbar-brand" href="/">Bad-Bank</a>
      { show && <p className='text-center text-white'>{user.email}</p>}
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <Link className="nav-link active" id="home" aria-current="page" to="/" onClick={activeToggle} onMouseMove={hoverToggle} onMouseOut={hoverToggleOut}>Home</Link>
              <ul id="home-hover" className="dropdown-menu">
                <li className="dropdown-item">Go Home</li>
              </ul>
            </li>
            {
              !show ? 
                (
                  <li className="nav-item">
                    <Link className="nav-link" id="creaccnt" aria-current="page" to="/CreateAccount/" onClick={activeToggle} onMouseMove={hoverToggle} onMouseOut={hoverToggleOut}>Create Account</Link>
                    <ul id="creaccnt-hover" className="dropdown-menu">
                      <li className="dropdown-item">Create a new Account</li>
                    </ul>
                  </li>
                ):<></>
            }
            <li className="nav-item">
              <Link className="nav-link" id="login" aria-current="page" to="/login/" onClick={activeToggle} onMouseMove={hoverToggle} onMouseOut={hoverToggleOut}>Login</Link>
              <ul id="login-hover" className="dropdown-menu">
                <li className="dropdown-item">Sign in</li>
              </ul>
            </li>
            {
              show ? 
                (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" id="alldata" aria-current="page" to="/alldata/" onClick={activeToggle} onMouseMove={hoverToggle} onMouseOut={hoverToggleOut}>All Data</Link>
                      <ul id="alldata-hover" className="dropdown-menu">
                        <li className="dropdown-item">Show All Data</li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" id="withdraw" aria-current="page" to="/withdraw/" onClick={activeToggle} onMouseMove={hoverToggle} onMouseOut={hoverToggleOut}>Withdraw</Link>
                      <ul id="withdraw-hover" className="dropdown-menu">
                        <li className="dropdown-item">Cash Back Money</li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" id="deposit" aria-current="page" to="/deposit/" onClick={activeToggle} onMouseMove={hoverToggle} onMouseOut={hoverToggleOut}>Deposit</Link>
                      <ul id="deposit-hover" className="dropdown-menu">
                        <li className="dropdown-item">Deposit in your account</li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" id="balance" aria-current="page" to="/balance/" onClick={activeToggle} onMouseMove={hoverToggle} onMouseOut={hoverToggleOut}>Balance</Link>
                      <ul id="balance-hover" className="dropdown-menu">
                        <li className="dropdown-item">Check the balance of your account</li>
                      </ul>
                    </li>
                  </>
                ):(
                  <>
                  </>
                )
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
