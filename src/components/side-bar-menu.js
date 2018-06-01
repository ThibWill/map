import React, { Component } from 'react'
import '../App.css'
import FSApi from '../api/FS-api.js'

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      links: [],
      getPositionPin: props.getPositionPin,
      getPositionMap: props.getPositionMap,
      response: undefined,
      renderResp: [],
    }
    this.requestApi = this.requestApi.bind(this);
  }

  componentDidMount() {
    this.links(['food', 'shops', 'arts', 'topPicks']);
  }

  requestApi(categorie, position, zoom) {
    console.log(position)
    FSApi.exploreBuisness({
      ll: position,
      section: categorie,
      radius: Math.floor((2 / zoom) * 100000),
      limit: 5,
      client_id: 'TCVQA5HHTCASCE0LROS4VEDVEFL0GP1GJITLHSC5JJQOVWCG',
      client_secret: '1RVM30U4DB4HD00AHT2IMRXN2NWUOPMBXQ2BEZVWJSFWJQPN',
      v: '20180520',
    }, (resp) => {
      if (resp) {
        console.log(resp.response.groups[0]);
        this.setState({ response: resp.response.groups[0] });
        const responses = [];
        resp.response.groups[0].items.forEach((res) => {
          responses.push(<div> {res.venue.name} </div>);
        });
        this.setState({ renderResp: responses });
      }
    })
  }

  links(sections) {
    let chainLink = [];
    chainLink.push(<div style={{textAlign: 'center', marginTop:'10px', marginBottom:'5px'}}> Avec un point : </div>);
    sections.forEach((section) => {
      let element = <button onClick={() => (this.requestApi(section, this.state.getPositionPin(), 2))} > {section} </button>
      chainLink.push(element)
    });
    chainLink.push(<div > Avec le centre de la carte : </div>);
    sections.forEach((section) => {
      let element = <button onClick={() => (this.requestApi(
        section,
        this.state.getPositionMap()[0], //Position
        this.state.getPositionMap()[1]))} /* Zoom */>  
        {section + ' Map !'}
      </button>
      chainLink.push(element)
    });
    this.setState({ links: chainLink })
  }


  render() {
    return (
      <div className="Side-bar">
        {this.state.links}
        {this.state.response ?
          <div className="Results">
            <span>Vos réponses :</span>
            {this.state.renderResp}
          </div>
          : null
        }
      </div>
    );
  }
}

export default Menu;