import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Route, Routes } from 'react-router';
// import Nav from './Nav/Nav';
// import Card from './Card/Card';
import Point from './Point/Point';
import Profile from './Profile/Profile';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Point />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
