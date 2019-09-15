import React from 'react'
import { Button, Drawer } from 'antd'
import ChoiceCard from './Card.js'

const styling = {
  position: 'absolute',
  top: '0px',
  right: '-350px',
  width: '350px',
  height: '850px',
  overflow: 'scroll',
  display: 'flex',
  flexDirection: 'column',
}

class OptionsWrapper extends React.Component {
  state = {
    cards: {}
  };
  render() {
    console.log(this.props.places)
    return (
      <div style={styling}>
        {this.props.places && this.props.places.map((place) => <ChoiceCard icon={place.icon} name={place.name} rating={place.rating}/>)}
      </div>
    );
  }
}

export default OptionsWrapper
