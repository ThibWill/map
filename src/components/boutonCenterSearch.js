import React from 'react'

class boutonCenter extends React.Component {
  render() {
    return(
      <div style={{font:'18px Arial', textAlign: 'center', borderRadius: '5px', background: 'white',right:0, padding: '5px 10px 5px 10px', marginRight: '70px', marginTop: '20px', position:'absolute', zIndex:2}}>
        <div>Voulez vous centrer sur vos résultats ?</div>
        <button style={{width:'100px', height:'20px'}} onClick={this.props.centerOnResearch}>Bien sûr</button>
      </div>
    )
  }
}

export default boutonCenter;