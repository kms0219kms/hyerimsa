import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home, About, Donate, Band, React_main } from './pages';
import { Navbar, Footer, NotFound } from './components';

function App() {
  return (
    <div>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Redirect from="/Home" to="/" component={Home} />
          <Route path="/About" component={About} />
          <Route path="/Donate" component={Donate} />
          <Route path="/Band" component={Band} />
          <Route path="/React" component={React_main} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
