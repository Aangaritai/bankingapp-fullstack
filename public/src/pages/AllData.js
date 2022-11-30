import React from 'react';
import {getAuth, deleteUser} from 'firebase/auth'
import authConfig from '../authfirebase';

function AllData() {
  const [data, setData] = React.useState(null);


  React.useEffect(() => {
    // fetch all accounts from API
    try {
      const auth = getAuth(authConfig)
      const user = auth.currentUser
      user.getIdToken()
        .then(idToken => {
          const promise = async () => {
            let response = await fetch(`/movements/${user.email}`, {
              method: 'GET',
              headers: {
                'Authorization': idToken
              }
            })
            try { 
              let data = await response.json()
              return data

            } catch (e) {
              console.log(e)
            }
          }
          promise().then( data => {
            setData(data);
          }).catch(e => console.error(e))

        })
    }catch(e){
      console.error(e)
    }
  }, [])

  const auth = getAuth();
  const user = auth.currentUser;

  async function deleteUserMongo() { 
    user.getIdToken()
      .then(idToken => {
        (async () => {
          const req = await fetch(`/account/delete/${user.email}`, {
            method: 'DELETE',
            headers: { 'Authorization': idToken }
          })
          console.log(req)
        })()
          .then(() => {
            deleteUser(user).then(() => {
              auth.signOut()
              window.location.href = '/'
            }).catch((error) => {
              console.error(error)
              if (error.message === 'Firebase: Error (auth/requires-recent-login)') {
                auth.signOut()
                alert('Please logn again')
              }
            });
          })
      })
  }


  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <h2 className='text-center'>Movements</h2>
      <button
        className="btn btn-danger"
        onClick={deleteUserMongo}
      >
        Delete User
      </button>
      {
        data ?
          (
            data.length > 0 ? 
            (
              <ul className='list-group'>
                {
                  data.map((user, i) => {
                    return (
                      <li 
                        className='list-group-item' 
                        key={i}
                      >
                        <p>
                          <span className='fw-bold'>Email:
                          </span>{user.email}
                        </p>
                        <p>
                          <span className='fw-bold'>type:
                          </span>{user.type}
                        </p>
                        <p>
                          <span className='fw-bold'>Final Balance:
                          </span>{user.balance}
                        </p>
                      </li>
                    )
                  })
                }
              </ul>
            ):<p>No data avaliable</p>
          ):<p className="text-center">Loading...</p>
      }
    </div>
  );
}

export default AllData;

