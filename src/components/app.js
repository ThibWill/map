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
    this.map = React.createRef();
  }

  setPositionPin = (newLat, newLong) => {
    this.setState({
      lattitudePin: newLat,
      longitudePin: newLong,
    })
  }

  getPositionPin = () => {
    return this.state.lattitudePin + ',' + this.state.longitudePin;
  }

  setPositionMap = (newPositionMap, newZoom) => {
    this.setState({
      positionMap: newPositionMap,
      zoom: newZoom,
    })
  }

  getPositionMap = () => {
    return [this.state.positionMap, this.state.zoom];
  }

  putPins = (responses) => {
    this.map.current.putPins(responses);
  }

  render() {
    return (
      <div className="App">
        <MapContainer
          ref = {this.map}
          setPositionPin = {this.setPositionPin}
          setPositionMap = {this.setPositionMap}
        />;
        <Menu
          getPositionPin = {this.getPositionPin}
          getPositionMap = {this.getPositionMap}
          putPins = {this.putPins}
        />
      </div>
    );
  }
}

export default App;
