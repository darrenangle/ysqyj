import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactPlayer from 'react-player'
import { isAdmin } from '../../../api/security/security.js';

import { EditVideoForm } from './edit-video.jsx';

export class SingleResponseVideo extends Component {
  constructor(props){
    super(props);
    this.state = {
      url: "",
      audioFileURL: "",
      posterUrl:""
    }
    this.showEditForm = this.showEditForm.bind(this);
    this.getSignedUrls = this.getSignedUrls.bind(this);
  }



  componentWillMount(){
    this.getSignedUrls();
  }

  getSignedUrls(){
    let urls = {
      audioFileUrl: this.props.video.audioFileURL,
      posterUrl: this.props.video.posterUrl,
      cdnUrl: this.props.video.cdnUrl
    }
    let t = this;
    Meteor.call('getResponseVideoUrls', urls, Meteor.userId(), function(error,signedUrls){
      if (error) {console.log(error)} else {
        console.log(signedUrls);
        t.setState(signedUrls)
      }
    })

  }

  getSignedAudioUrl(){
    var t = this;
    Meteor.call('getSignedUrl.clientResponseVideo', this.props.video.audioFileURL, Meteor.userId(), function(error, signedUrl){
      if (error) {console.log(error)} else {
        t.setState({audioFileURL: signedUrl})
      }
    })
  }

  getSignedPosterUrl(){
    var t = this;
    Meteor.call('getSignedUrl.clientResponseVideo', this.props.video.posterUrl, Meteor.userId(), function(error, signedUrl){
      if (error) {console.log(error)} else {
        // console.log(signedUrl);
        t.setState({posterUrl: signedUrl});
      }
    })
  }
  getSignedUrl(){
    var t = this;
    Meteor.call('getSignedUrl.clientResponseVideo', this.props.video.cdnUrl, Meteor.userId(), function(error, signedUrl){
      if (error) {console.log(error)} else {
        t.setState({url: signedUrl})
      }
    })
  }
  showEditForm(event){
    if(!this.refs.editform.style.display || this.refs.editform.style.display=="none" ){
      this.refs.editform.style.display = "block";
    } else {
      this.refs.editform.style.display = "none";
    }

  }
  renderReactPlayer(){
    return(
      <ReactPlayer
        className='single-video-player'
        url={this.state.url}
        width="100%"
        height='100%'
        controls={true}
        fileConfig={{ attributes: { poster: this.state.posterUrl } }}
      />
    )
  }

  render(){
    return(
      <div className='single-response-video-wrapper row'>
        {/*
          Trying to keep this to a two column situation
          Column one is just the video, Column two is the title and description
        */}
        <div className='col-xs-12 col-sm-6'>
          {
            this.state.posterUrl ? this.renderReactPlayer() : "Loading..."
          }
        </div>
        <div className='col-xs-12 col-sm-6'>
          <h3>{this.props.video.responseRank}. {this.props.video.videoTitle}</h3>
          <p>{this.props.video.videoDescription}</p>
          {this.props.video.videoHomework?
            <p><strong>Homework:<br/></strong>{this.props.video.videoHomework}</p>
            : <span></span>
          }
          {this.props.video.audioFileURL?
            <div>
              <a href={this.state.audioFileURL} download>Download Audio</a>
            </div>
          : <span></span>
          }
          { isAdmin(Meteor.userId()) ?
            <div>
              <p className='edit-video-button' onClick={this.showEditForm}>Edit Video</p>
              <div className='edit-video-form' ref='editform'>
                <EditVideoForm video={this.props.video}/>
              </div>
            </div>
            : <span></span>
          }

        </div>
      </div>
    )
  }
}
