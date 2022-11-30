function FormCreateAccount(props){
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" value={props.values.name} onChange={props.setOnChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" value={props.values.email} onChange={props.setOnChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" value={props.values.password} onChange={props.setOnChange}/>
      </div>
      {
        props.isValid ? 
          (
            <button type="submit" className="btn btn-light" onClick={props.handleCreate}>Create Account</button>
          ):(
            <button type="submit" className="btn btn-light" disabled onClick={props.handleCreate}>Create Account</button>
          )
      }
    </form>

  );
}

export default FormCreateAccount;
