function Card(props){
  function classes() {
    const bg = props.bgcolor ? 'bg-' + props.bgcolor : ' ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor : ' text-white';
    return 'card m-4 ' + bg + txt;
  }
  return (
    <div className={classes()}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && ( <h5 className="card-title">{props.title}</h5> )}
        {props.text && ( <p className="card-text">{props.text}</p> )}
        {props.body}
        {props.status && ( <p id="createStatus" className="mt-3">{props.status}</p> )}
      </div>
    </div>

  );
}
export default Card;
