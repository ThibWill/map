import React from 'react';
import App from './app';
import '../App.css';
import Home from '../home.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Routes extends React.Component {

  render() {
    return(
      <Router>
        <div>
          <ul className="Routes">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/map">Map</Link>
            </li>
          </ul>

          <Route path="/home" component={Home} />
          <Route path="/map" component={App} />

        </div>
      </Router>
    )
  }
}

export default Routes;