import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './marker.js';
import Inputbar from './search-bar.js'

class SimpleMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      setPositionPin: props.setPositionPin,
      setPositionMap: props.setPositionMap,
      latPoint: 10,
      lngPoint: 10,
      latResearch: 90,
      lngResearch: 0,
      pins: [],
    };
    this.map = React.createRef()
  }

  static defaultProps = {
    center: {
      lat: 10,
      lng: 10
    },
    zoom: 2
  };

  handleClick = (event) => {
    this.state.setPositionPin(event.lat, event.lng)
    this.setState({
      latPoint: event.lat,
      lngPoint: event.lng
    })
    console.log(event.lat + ',' + event.lng)
  }

  setPositionResearch = (newLat, newLong) => {
    this.setState({
      latResearch: newLat,
      lngResearch: newLong,
    })
  }

  handleOnChange = (e) => {
    console.log(e.center, e.zoom)
    this.state.setPositionMap(e.center.lat + ',' + e.center.lng, e.zoom)
  }

  putPins = (results) => {
    let pins = []
    if(results) {
      for(let i=0; i<results.length; i++) {
        pins.push(<Marker lat={results[i].venue.location.lat} lng={results[i].venue.location.lng}/>)
      }
    }
    this.setState({pins: pins});
  }

  render() {

    return (
      // Important! Always set the container height explicitly
      <div style={{ marginLeft: '200px', right: '0', bottom: '0' }}>
        <Inputbar
          setPositionResearch={this.setPositionResearch}
        />
        <GoogleMapReact ref={this.map} 
        onClick={this.handleClick}
        onChange={this.handleOnChange}
        style={{
          height: '100vh', width: '100%',
          position: "relative", top: '-18px'
        }}

        bootstrapURLKeys={{ key: 'AIzaSyC_hKRbfBW7RsmoEV5p4fbFNMGKT5v_m8Q' }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <Marker
          lat={this.state.latPoint}
          lng={this.state.lngPoint}
        />
        <Marker
          lat={this.state.latResearch}
          lng={this.state.lngResearch}
        />
        {this.state.pins}
      </GoogleMapReact>;
      </div>
    );
  }
}

export default SimpleMap;