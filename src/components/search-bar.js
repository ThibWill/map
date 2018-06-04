import React from 'react';
import '../App.css';
import FSApi from '../api/FS-api.js';
import ReactAutocomplete from 'react-autocomplete'

class Inputbar extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      value: '',
      items: [],
    }
  }


  handleOnChange(event) {
    this.setState({ value: event.target.value });
    FSApi.autoComplete(
      'http://35.187.9.126:2322/api',
      { q: event.target.value }, 
      (resp) => {
        if(resp && resp.features && resp.features.length !== 0) {
          console.log(resp.features);
          let itemsList = [];
          for(let i = 0; i < resp.features.length; i++) {
            if (i < 5 && resp.features[i]) {
              if(resp.features[i].properties.name) {
                itemsList.push({
                  id: i, 
                  label: resp.features[i].properties.name, 
                  country: resp.features[i].properties.country, 
                  city: resp.features[i].properties.city, 
                  coordinates: resp.features[i].geometry.coordinates,
                });
              }
              else if(resp.features[i].properties.street) {
                itemsList.push({
                  id: i, 
                  label: resp.features[i].properties.housenumber + ' ' + resp.features[i].properties.street, 
                  country: resp.features[i].properties.country, 
                  city: resp.features[i].properties.city, 
                  coordinates: resp.features[i].geometry.coordinates,
                });
              }
            }
          };
          this.setState({items: itemsList})
        }
        else {
          this.setState({items: []})
        }
      }
    ) 
  }
  
  render() {
    return(
      <ReactAutocomplete className='Inputbar'
        items={this.state.items}
       // shouldItemRender={(item, value) => {console.log(item); item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}}
        getItemValue={item => item.label}
        renderItem={(item, highlighted) =>
          <div 
            key={item.id}
            style={{ backgroundColor: highlighted ? '#eee' : 'transparent', zIndex: '2'}}
          >
            {<div style={{margin: '5px 5px 5px 10px', padding: '5px 5px 5px 5px'}}>
              <span style={{font: 'bold 15px Arial'}}>{item.label}</span>
              <span style={{font: '15px Arial'}}>{', ' + item.country}</span>
              {item.city !== undefined ? <span style={{font: '15px Arial'}}>{', ' + item.city}</span> : null }
            </div>}
          </div>
        }
        value={this.state.value}
        onChange={this.handleOnChange.bind(this)}
        onSelect={(value, event) => {
          this.setState({ value });
          this.props.setPositionResearch(event.coordinates[1], event.coordinates[0]);
        }}
        //style input
        inputProps={{ style:  {
          left: '250px',
          top: '30px',
          zIndex: '2',
          position: 'absolute',
          width: '400px',
          padding: '12px 20px',
          margin: '8px 0',
          display: 'inline-block',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxSizing: 'border-box',
          placeholder: 'Faites votre recherche!',
          font: '15px Arial'}}} 
        //style menu
        menuStyle={{
          borderRadius: '3px',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '2px 0',
          fontSize: '90%',
          position: 'fixed',
          overflow: 'auto',
          maxHeight: '50%',
          zIndex:'2',
        }}
      />
      //<input type="text" onChange={this.handleOnChange.bind(this)}className='Inputbar'></input>
    );
  }

}

export default Inputbar;