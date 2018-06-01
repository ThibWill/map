import React, { Component } from 'react';
import MapContainer from './map.js'
import Menu from './side-bar-menu'
import '../App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      longitudePin: -10,
      lattitudePin: -10,
      positionMap: '10,10',
      zoom: 2,
    }
    this.setPositionPin = this.setPositionPin.bind(this)
    this.getPositionPin = this.getPositionPin.bind(this)
    this.setPositionMap = this.setPositionMap.bind(this)
    this.getPositionMap = this.getPositionMap.bind(this)
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

  setPositionMap(newPositionMap, newZoom) {
    this.setState({
      positionMap: newPositionMap,
      zoom: newZoom,
    })
  }

  getPositionMap() {
    return [this.state.positionMap, this.state.zoom];
  }

  render() {
    return (
      <div className="App">
        <MapContainer
          setPositionPin = {this.setPositionPin}
          setPositionMap = {this.setPositionMap}
        />
        <Menu
          getPositionPin = {this.getPositionPin}
          getPositionMap = {this.getPositionMap}
        />
      </div>
    );
  }
}

export default App;
