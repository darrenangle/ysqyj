import React, { Component, PropTypes } from 'react';
import ReactPlayer from 'react-player'
import { Meteor } from 'meteor/meteor';

export class RecapVideo extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  renderVideoEl(){

    return(
      <div className='row'>
        <ReactPlayer
          className='col-xs-12'
          url={this.props.url}
          width="100%"
          height='100%'
          controls={true}
        />
      </div>
    )
  }

  render(){
    return(
      <div className='recap-video-wrapper'>
        <h2>Recap Video</h2>
        <h4>
          A general overview of your survey, our conversation,
          and your biggest action items.
          Use it as a quick reference.
        </h4><br/>
        <div className='full-width-video-wrapper'>
          {
            this.renderVideoEl()
          }
        </div>
      </div>
    )
  }
}
