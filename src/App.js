import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import mentoringLogo from './css/mentoring-2738524_1920.jpg';




import './App.css';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Addproducts from './Components/Addproducts';
import GetProducts from './Components/Getproducts';
import NotFound from './Components/Notfound';
import Makepayment from './Components/Makepayment';
import About from './Components/About';
import Contact from './Components/Contact';


function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            {/* Brand / Logo */}
            <Link className="navbar-brand d-flex align-items-center" to="/">
                <img 
                  src={mentoringLogo} 
                  alt="Mentoring Logo" 
                  style={{ height: "40px", marginRight: "10px", width: "100px", borderRadius: "5px", backgroundColor: "transparent"}} 
                />
              </Link>


            {/* Toggle button for mobile view */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navbar links */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/addproducts" className="nav-link">Add Mentors</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">Signup</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signin" className="nav-link">Signin</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      <header className="App-header">
        <h2 className='text-warning'>Mentors-Discover mentors who will ignite your potential </h2>
      </header>
      <Routes>
        <Route path="/" element={<GetProducts />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path='/makepayment' element={<Makepayment />} />
        <Route path="/addproducts" element={<Addproducts />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
