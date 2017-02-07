import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export class RecapVideo extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  render(){
    return(
      <div className='recap-video-wrapper'>
        <h2>Recap Video</h2>
        <h4>A general overview of your survey, our conversation, and your biggest action items. Use it as a quick reference.</h4>
        <p>Video ID: {this.props.videoId}</p>
        <div className='full-width-video-wrapper'>

        </div>
      </div>
    )
  }
}
