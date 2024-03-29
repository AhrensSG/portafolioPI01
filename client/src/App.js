import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import GameCreate from './components/GameCreate';
import Detalle from './components/Detalle';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path='/home' component={Home}/>
          <Route  path='/videogames' component={GameCreate}/>
          <Route path='/home/:id' component={Detalle}/>

        </Switch>
        
        
      </div>
    </BrowserRouter>
  );
}

export default App;
