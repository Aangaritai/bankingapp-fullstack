import React from 'react';
import Card from '../components/Card';

import { getAuth } from 'firebase/auth';
import conf from '../conf-firebase.js'

function Balance() {
  const [status, setStatus] = React.useState('');
  const [data, setData] = React.useState([{
    name:"",
    email:"",
    balance:""
  }]);

  React.useEffect(() => {
    const auth = getAuth(conf)
    const user = auth.currentUser
    user.getIdToken()
      .then(idToken => {
        const promise = async () => {
          let response = await fetch(`/account/${user.email}`, {
            method: 'GET',
            headers: {
              'Authorization': idToken
            }
          })
          let data = await response.json()
          return data
        }
        promise().then( data => {
          if (data.length > 0) {
            setStatus('');
            setData(data)
          } else {
            setStatus('Can´t find user');
          }
        })
      })
  }, [])

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <Card
        bgcolor="warning"
        txtcolor="black"
        header="Balance"
        status={status}
        body={
          data.map( (user, i) => {
            return (
              <div key={i}>
                <p className="fw-bold m-0">Name:</p>
                <p className="m-0">{user.name}</p>
                <p className="fw-bold m-0">Email:</p>
                <p className="m-0">{user.email}</p>
                <p className="fw-bold m-0">Balance:</p>
                <p className="m-0">{user.balance}</p>
              </div>
            );
          })
        }
      />
    </div>
  );
}

export default Balance;
