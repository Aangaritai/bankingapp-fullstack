import React from 'react';
import Card from '../components/Card';
import ATM from '../components/ATM';

import { getAuth } from 'firebase/auth';
import conf from '../conf-firebase.js'

function Deposit() {
  const [status, setStatus] = React.useState('');
  const [data, setData] = React.useState(null);


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
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <Card
        bgcolor="success"
        header="Deposit"
        status={status}
        body={
          data ? 
            (
              <ATM
                atmMode="Deposit"
                isDeposit={true}
                email={data[0].email}
                balance={data[0].balance}
              />
            ):<p className='text-center'>Loading...</p>
        }
      />

    </div>
  );
}

export default Deposit;

