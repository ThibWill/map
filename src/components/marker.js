import React from 'react'
import '../App.css'

class Marker extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      lng: props.lng,
      lat: props.lat,
      hidden: props.hidden,
    }
  }

  render() {
    return(
      <div className='Marker'></div>
    );
  }

}

export default Marker;