import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';
import Marker from './marker.js';
import Inputbar from './search-bar.js';
import FSApi from '../api/FS-api';
import Bouton from './boutonCenterSearch.js'

class SimpleMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      latPoint: 10,
      lngPoint: 10,
      pins: [],
      mapPosition: { zoom: 0, center: { lat: 0, lng: 0 } },
      realMapPosition: { zoom: 0, center: { lat: 0, lng: 0 } },
      updateMap: false,
    };
    this.map = React.createRef();
  }

  static defaultProps = {
    center: {
      lat: 10,
      lng: 10
    },
    zoom: 2
  };

  handleClick = (event) => {
    this.props.setPositionPin(event.lat, event.lng);
    this.setState({
      latPoint: event.lat,
      lngPoint: event.lng
    });
    console.log(event.lat + ',' + event.lng);
  }

  handleOnChange = (e) => {
    console.log(e);
    this.props.setPositionMap(e.center.lat + ',' + e.center.lng, e.zoom);
    let type = this.props.onBoundsChange();
    if (type) {
      this.requestApi(type, e.center.lat + ',' + e.center.lng, e.size, 40)
    };
  }

  requestApi = (categorie, position, size, limit) => {
    console.log(position);
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
        this.putPins(resp.response.groups[0].items, size);
      }
    })
  }

  putPins = (results, size) => {
    if(this.state.updateMap) {
      let pins = [];
      let bounds = { length: 0 };
      if (results) {
        for (let i = 0; i < results.length; i++) {
          let newBounds = this.calculateMaxLength(results[i], results);
          if (newBounds.length > bounds.length) {
            bounds = newBounds;
          }
          if (results[i].venue.categories[0].icon.prefix.indexOf('shops') !== -1) {
            pins.push(<Marker key={i} lat={results[i].venue.location.lat} lng={results[i].venue.location.lng} type="shop" />);
          }
          else if (results[i].venue.categories[0].icon.prefix.indexOf('arts') !== -1) {
            pins.push(<Marker key={i} lat={results[i].venue.location.lat} lng={results[i].venue.location.lng} type="art" />);
          }
          else if (results[i].venue.categories[0].icon.prefix.indexOf('food') !== -1) {
            pins.push(<Marker key={i} lat={results[i].venue.location.lat} lng={results[i].venue.location.lng} type="food" />);
          }
          else {
            pins.push(<Marker key={i} lat={results[i].venue.location.lat} lng={results[i].venue.location.lng} type="no_type" />);
          }
        }
      }
      this.setState({ pins: pins });
      if (bounds.points && size) {
        const googleMapBounds = this.buildBounds(bounds.points);
        this.setState({ mapPosition: fitBounds(googleMapBounds, size) });
        this.setState({updateMap: false})
        console.log(this.state.mapPosition)
      }
    }
  }

  buildBounds = (points) => {
    if (points.point1.lat < points.point2.lat && points.point1.lng < points.point2.lng) {
      return {
        sw: { lat: points.point1.lat, lng: points.point1.lng },
        ne: { lat: points.point2.lat, lng: points.point2.lng }
      };
    }
    else if (points.point1.lat > points.point2.lat && points.point1.lng < points.point2.lng) {
      return {
        nw: { lat: points.point1.lat, lng: points.point1.lng },
        se: { lat: points.point2.lat, lng: points.point2.lng }
      };
    }
    else if (points.point1.lat < points.point2.lat && points.point1.lng > points.point2.lng) {
      return {
        se: { lat: points.point1.lat, lng: points.point1.lng },
        nw: { lat: points.point2.lat, lng: points.point2.lng }
      };
    }
    else if (points.point1.lat > points.point2.lat && points.point1.lng > points.point2.lng) {
      return {
        ne: { lat: points.point1.lat, lng: points.point1.lng },
        sw: { lat: points.point2.lat, lng: points.point2.lng }
      };
    }
    else {
      return undefined;
    }
  }

  calculateMaxLength = (result, results) => {
    let bounds = { length: 0 };
    results.forEach((otherResult) => {
      let newLength = Math.sqrt((otherResult.venue.location.lat - result.venue.location.lat) ** 2 + (otherResult.venue.location.lng - result.venue.location.lng) ** 2);
      if (newLength > bounds.length) {
        bounds = {
          length: newLength,
          points: {
            point1: { lat: otherResult.venue.location.lat, lng: otherResult.venue.location.lng },
            point2: { lat: result.venue.location.lat, lng: result.venue.location.lng }
          }
        };
      }
    });
    return bounds;
  }

  centerOnResearch = () => {
    this.setState({realMapPosition: this.state.mapPosition})
  }

  render() {

    return (
      // Important! Always set the container height explicitly
      <div style={{ marginLeft: '200px', right: '0', bottom: '0' }}>
        <Inputbar
          setPositionResearch={this.setPositionResearch}
        />
        {this.props.onBoundsChange() ? <Bouton centerOnResearch = {this.centerOnResearch} /> : null}
        <GoogleMapReact 
          ref={this.map}
          onClick={this.handleClick}
          onChange={this.handleOnChange}
          onDrag={() => {this.setState({updateMap: true})}}
          style={{
            height: '100vh', width: '100%',
            position: "relative", top: '-18px'
          }}

          bootstrapURLKeys={{ key: 'AIzaSyC_hKRbfBW7RsmoEV5p4fbFNMGKT5v_m8Q' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          zoom={this.state.realMapPosition.zoom-1}
          center={this.state.realMapPosition.center}
        >
          <Marker
            lat={this.state.latPoint}
            lng={this.state.lngPoint}
            type="searchPoint"
          />
          {this.state.pins}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;