import React, { Component } from 'react';
import MapContainer from './map.js'
import Menu from './side-bar-menu'
import '../App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      longitudePin: 0,
      lattitudePin: 0,
    }
    this.setPositionPin = this.setPositionPin.bind(this)
    this.getPositionPin = this.getPositionPin.bind(this)
  }

  setPositionPin(newLat, newLong) {
    this.setState({
      lattitudePin: newLat,
      longitudePin: newLong,
    })
  }

  getPositionPin() {
    return this.state.lattitudePin + ',' + this.state.longitudePin;
  }

  render() {
    return (
      <div className="App">
        <MapContainer
          setPositionPin = {this.setPositionPin}
        />
        <Menu
          getPositionPin = {this.getPositionPin}
        />
      </div>
    );
  }
}

export default App;
