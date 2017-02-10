import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export class SingleResponseVideo extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }

  render(){
    return(
      <div>
        <h3>
          {this.props.video.videoTitle}
        </h3>
      </div>
    )
  }
}
