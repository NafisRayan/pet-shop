import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import PetListing from './pages/PetListing';
import AddPet from './pages/AddPet';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/pets" component={PetListing} />
            <Route path="/add-pet" component={AddPet} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
