import React from 'react'
import { getAuth } from 'firebase/auth';
import authConfig from '../authfirebase';

function ATMForm({ onChange, isDeposit, isValid}){
  const choice = ["Deposit", "Cash Back"];
  return (
    <label>
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="txtForm" type="number" width="200" onChange={onChange} className="form-control"></input>
      {isValid
        ? <input type="submit" width="200" value={choice[Number(!isDeposit)]} className="btn btn-light mt-2 enable"></input>
        : <input type="submit" width="200" value={choice[Number(!isDeposit)]} disabled className="btn btn-light mt-2 disable"></input>
      }
    </label>
  );
};

function ATM({atmMode, isDeposit, email, balance}){
  const [isValid, setIsValid] = React.useState(false);
  const [status, setStatus] = React.useState('');
  const [totalState, setTotalState] = React.useState(balance)
  let deposit = 0;

  const auth = getAuth(authConfig)

  const checkNumber = () => {
    if(deposit <= 0) {
      setStatus('Quantity Invalid');
      return false;
    }else{
      setStatus('');
      return true;
    }
  }

  const handleChange = e => {
    deposit = Number(e.target.value);

    if(atmMode === "Cash Back" && deposit > totalState){
      setIsValid(false);
      setStatus('Quantity Invalid');
    }else{
      setIsValid(checkNumber);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!checkNumber()) return;

    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    try {
      auth.currentUser.getIdToken()
        .then(idToken => {
          const promise = async () => {
            let response = await fetch(`/account/update/${email}/${newTotal}/${atmMode}`, {
              method: 'PUT',
              headers: {
                'Authorization': idToken
              }
            })
            let data = await response.json()
            return data
          }
          promise().then( () => {
            setTotalState(newTotal)
            setStatus('Success')
            setTimeout(() => setStatus(''), 3000)
            e.target.txtForm.value = ""
          })
        })
    }catch(e){
      console.error(e)
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <p className="fw-bold m-1">Balance:</p>
      <p className="m-1">{totalState}</p>
      <ATMForm onChange={handleChange} isDeposit={isDeposit} isValid={isValid}></ATMForm>
      <label className="fw-bold">{status}</label>
    </form>
  );
};

export default ATM;

