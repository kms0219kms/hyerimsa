import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Home, About, Donate, Band, React_main } from './pages';
import { Navbar, Footer, NotFound } from './components';

function App() {
  return (
    <div>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/donate" component={Donate} />
          <Route path="/band" component={Band} />
          <Route path="/react" component={React_main} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
