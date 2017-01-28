import React, { Component, PropTypes } from 'react';
import TermsText from './terms-text.jsx';
export default class TermsWrapper extends Component {
  render(){
    return(
      <div className='container'>
        <h1>Terms of Use</h1>
        <TermsText/>
      </div>
    )
  }
}
