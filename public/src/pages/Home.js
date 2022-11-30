import bankImg from '../img/bank.png';
import Card from '../components/Card';
function Home() {
  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <Card
        txtcolor="black"
        header="BadBank Landing Page"
        title="Welcome to the Bank"
        text="You can use this bank"
        body={(<img src={bankImg} className="img-fluid" alt="Bank" />)}
      />
    </div>
  );
}

export default Home;
