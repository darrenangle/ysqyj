import React, { Component, PropTypes } from 'react';
import DisclaimerText from './disclaimer-text.jsx';
export default class DisclaimerWrapper extends Component {
  render(){
    return(
      <div className='container'>
        <h1>Disclaimers</h1>
        <DisclaimerText/>
      </div>
    )
  }
}
