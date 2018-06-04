import React from 'react'
import '../App.css'

class Marker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lng: props.lng,
      lat: props.lat,
    }
  }

  render() {
    let color;
    if(this.props.type === 'shop') {
      color = 'green';
    }
    else if (this.props.type === 'food') {
      color = 'red'
    } 
    else if (this.props.type === 'art') {
      color = 'blue'
    }
    else if (this.props.type === 'searchPoint') {
      color = 'orange'
    }
    else {
      color = 'black'
    }
    return(
      <div className='Marker' style={{backgroundColor: color}}></div>
    );
  }
}

export default Marker;