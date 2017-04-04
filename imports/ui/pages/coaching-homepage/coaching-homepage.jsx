import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import Navbar from '../../components/nav/nav.jsx';

export default class CoachingHomepage extends Component {
  renter(){
    return(
      <div>
        <Navbar/>
        
      </div>
    )
  }
}
