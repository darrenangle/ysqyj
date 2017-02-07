import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import 'meteor/johndyer:mediaelement';




export class RecapVideo extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  getVideoURLbyID(){

  }
  uploadVideo(){

  }

  renderVideoEl(){
    let url = this.getVideoURLbyID()
    return(
      <div className='container'>
        <video></video>
      </div>
    )
  }
  renderVideoUpload(){
    return(
      <div className='container'>
        <h4>No recap video uploaded yet. Upload one below!</h4>
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
          { this.props.videoId  ?
            this.renderVideoEl()   :
            this.renderVideoUpload()
          }
        </div>
      </div>
    )
  }
}
