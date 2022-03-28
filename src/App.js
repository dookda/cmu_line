import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// import './Assets/css/style.css';
// import './App.css';
import Nav from './Nav/Nav';
import Card from './Card/Card';

function App() {
  return (
    <div className="container">
      <Nav />
      <Card />
    </div>
  );
}

export default App;
