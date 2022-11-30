import Card from '../components/Card';
import React from 'react';
import { 
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider

} from "firebase/auth";
import conf from '../conf-firebase.js'

function Login() {
  const [email, setEmail] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [status, setStatus] = React.useState('');
  const auth = getAuth(conf)

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

  function validate(field, label) {
    if (!field) {
      setStatus('Error ' + label);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  function handleCheck() {
    if (!validate(email, 'email')) return;
    if (!validate(password, 'passsword')) return;
    signInWithEmailAndPassword(auth, email, password)
      .then()
      .catch((error) => {
        setStatus(error.code)
      });
  }

  const provider = new GoogleAuthProvider();
  function LoginWithGoogle() {
    signInWithPopup(auth, provider)
      .then( result => {
        const user = result.user
        const url = `/account/create/${user.displayName}/${user.email}/secret123`;
        (async () => {
          let res = await fetch(url, { method: 'POST' });
          let data = await res.json()
          return data
        })()
          .then(() => window.location.href = '/')
          .catch((e) => console.error(e));

      })
  }


  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      {
        !show && (
          <div className='d-flex justify-content-center'>
            <button
              onClick={LoginWithGoogle}
              className="btn btn-warning m-3"
            >Login With Google</button>
          </div>
        )
      }
      <Card
        bgcolor="dark"
        header="Login"
        status={status}
        body={
          !show ? 
            (
              <>
                Email:<br/>
                <input 
                  type="email"
                  className="form-control"
                  id="email" 
                  placeholder="Enter Email"
                  value={email}
                  onChange={ e => setEmail(e.currentTarget.value) }
                /><br/>
                Password:<br/>
                <input 
                  type="password"
                  className="form-control"
                  id="password" 
                  placeholder="Enter Password"
                  value={password}
                  onChange={ e => setPassword(e.currentTarget.value) }
                /><br/>
                <button
                  type="submit"
                  className="btn btn-light m-1"
                  onClick={handleCheck}
                >Login</button>
              </>
            ):(
              <>
                <h5>Session Started</h5>
                <button
                  type="submit"
                  className="btn btn-light m-1"
                  onClick={() => auth.signOut()}
                >Sign Out</button>
              </>
            )
        }
      />
    </div>
  );
}

export default Login;
