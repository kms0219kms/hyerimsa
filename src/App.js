import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home, About, Donate, Band, React_main } from './pages';
import { Navbar, Footer, NotFound } from './components';

function App() {
  return (
    <div>
      <div className="small-device">
        <center>
            <h3>죄송합니다.</h3><br />
            <h5>서비스를 이용하는데 필요한 최소한의 기기 사이즈가 아닙니다.</h5>
            <h5>서비스를 이용하려면, 가로 320px 이상이어야 합니다.</h5>
            <h5>* 갤럭시 폴드의 경우 화면을 펼쳐 이용해 주세요.</h5>
        </center>
      </div>
      <div className="App">
      <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Redirect from="/Home" to="/" component={Home} />
          <Route path="/About" component={About} />
          <Route path="/Donate" component={Donate} />
          <Route path="/Band" component={Band} />
          <Route path="/React" component={React_main} />
          <Route component={NotFound} />
        </Switch>
      <Footer />
      </div>
    </div>
  );
}

export default App;
