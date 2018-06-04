import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './marker.js';
import Inputbar from './search-bar.js'
import FSApi from '../api/FS-api'

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

  componentWillReceiveProps(nextProps) {
    this.putPins(nextProps.businneses)
  }

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
    let type = this.props.onBoundsChange();
    if(type) {
      this.requestApi(type, e.center.lat + ',' + e.center.lng, e.zoom, 40)
    }
  }

  requestApi = (categorie, position, zoom, limit) => {
    console.log(position)
    FSApi.exploreBuisness({
      ll: position,
      section: categorie,
      radius: 100000,
      limit: limit,
      client_id: 'TCVQA5HHTCASCE0LROS4VEDVEFL0GP1GJITLHSC5JJQOVWCG',
      client_secret: '1RVM30U4DB4HD00AHT2IMRXN2NWUOPMBXQ2BEZVWJSFWJQPN',
      v: '20180520',
    }, (resp) => {
      if (resp) {
        console.log(resp.response.groups[0]);
        this.putPins(resp.response.groups[0].items)
      }
    })
  }

  putPins = (results) => {
    let pins = []
    if(results) {
      for(let i=0; i<results.length; i++) {
        if (results[i].venue.categories[0].icon.prefix.indexOf('shops') !== -1) {
          pins.push(<Marker lat={results[i].venue.location.lat} lng={results[i].venue.location.lng} type="shop"/>)
        }
        else if (results[i].venue.categories[0].icon.prefix.indexOf('arts') !== -1) {
          pins.push(<Marker lat={results[i].venue.location.lat} lng={results[i].venue.location.lng} type="art"/>)
        }
        else if (results[i].venue.categories[0].icon.prefix.indexOf('food') !== -1) {
          pins.push(<Marker lat={results[i].venue.location.lat} lng={results[i].venue.location.lng} type="food"/>)
        }
        else {
          pins.push(<Marker lat={results[i].venue.location.lat} lng={results[i].venue.location.lng} type="no_type"/>)
        }
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
          type="searchPoint"
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