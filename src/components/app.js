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
      flagResearch: false,
      typeResearch: 'noResearch',
    }
    this.map = React.createRef();
  }

  setPositionPin = (newLat, newLong) => {
    this.setState({
      lattitudePin: newLat,
      longitudePin: newLong,
    });
  }

  getPositionPin = () => {
    return this.state.lattitudePin + ',' + this.state.longitudePin;
  }

  setPositionMap = (newPositionMap, newZoom) => {
    this.setState({
      positionMap: newPositionMap,
      zoom: newZoom,
    });
  }
  
  onResearchChange = (newTypeResearch, newFlagResearch) => {
    newFlagResearch ? this.setState({flagResearch: true}) : this.setState({flagResearch: false});
    this.setState({typeResearch: newTypeResearch})
  }

  onBoundsChange = () => {
    if(this.state.flagResearch) { 
      return this.state.typeResearch; 
    } else { return false; }
  }

  getPositionMap = () => {
    return [this.state.positionMap, this.state.zoom];
  }

  onBusinnesChange = (responses) => {
    this.map.current.putPins(responses);
  }

  render() {
    return (
      <div className="App">
        <MapContainer ref={this.map}
          setPositionPin = {this.setPositionPin}
          setPositionMap = {this.setPositionMap}
          onBoundsChange = {this.onBoundsChange}
        />;
        <Menu
          getPositionPin = {this.getPositionPin}
          getPositionMap = {this.getPositionMap}
          onBusinnesChange = {this.onBusinnesChange}
          onResearchChange = {this.onResearchChange}
        />
      </div>
    );
  }
}

export default App;
