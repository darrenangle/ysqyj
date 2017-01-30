import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import SignupForm from './signup-form.jsx';

export default class GetStarted extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <div className='container'>
        <h1>Get Started</h1>
        <SignupForm/>
      </div>
    )
  }
}
