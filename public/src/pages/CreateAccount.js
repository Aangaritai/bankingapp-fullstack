import React from 'react';
import Card from '../components/Card';
import FormCreateAccount from '../components/FormCreateAccount';

import { 
  getAuth,
  createUserWithEmailAndPassword
} from 'firebase/auth';

import conf from '../conf-firebase.js'

function CreateAccount() {
  const [status, setStatus] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const auth = getAuth(conf)


  function validate(field, label) {
    if (!field) {
      setStatus('Error ' + label);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  function handleCreate(e) {
    e.preventDefault()
    if(!checkInput()) return;
    if (!validate(name, 'name')) return;
    if (!validate(email, 'email')) return;
    if (!validate(password, 'passsword')) return;
    if (password.length < 8) {
      setStatus('Password should be minimum 8 characters')
      setIsValid(false)
      return;
    }else{
      setStatus('');
      setIsValid(true);
    }

    const url = `/account/create/${name}/${email}/${password}`;
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        (async () => {
          let res = await fetch(url, { method: 'POST' });
          let data = await res.json();
          return data
        })()
          .then(() => window.location.href = '/')
          .catch((e) => console.error(e));
      })
      .catch(e => setStatus(e.code))
  }

  function checkInput() {
    let elements = document.getElementsByClassName('form-control');
    let value = elements.name.value + elements.email.value + elements.password.value;
    if (value === '' ) {
      setStatus('Please add your information');
      setIsValid(false)
      return false;
    }
    setStatus('');
    setIsValid(true);
    return true;
  }
  function setOnChange(e) {
    let id = e.currentTarget.id;
    let value = e.currentTarget.value;
    switch (id) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        setStatus('Error Critical');
    }
    checkInput()
  }

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <Card
        bgcolor="success"
        header="Create Account"
        status={status}
        body={
          <FormCreateAccount
            handleCreate={handleCreate}
            values={{name, email, password}}
            setOnChange={setOnChange}
            isValid={isValid}
          />
        }
      />
    </div>
  );
}

export default CreateAccount;
