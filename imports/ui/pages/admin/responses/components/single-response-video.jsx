import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactPlayer from 'react-player'

export class SingleResponseVideo extends Component {
  constructor(props){
    super(props);
    this.state = {
      url: ""
    }
  }

  componentWillMount(){
    this.getSignedUrl();
  }

  getSignedUrl(){
    var t = this;
    Meteor.call('getSignedUrl.clientResponseVideo', this.props.video.cdnUrl, Meteor.userId(), function(error, signedUrl){
      if (error) {console.log(error)} else {
        t.setState({url: signedUrl})
      }
    })
  }
  render(){
    return(
      <div className='single-response-video-wrapper row'>
        {/*
          Trying to keep this to a two column situation
          Column one is just the video, Column two is the title and description
        */}
        <div className='col-xs-12 col-sm-6'>
          <ReactPlayer
            className=''
            url={this.state.url}
            width="100%"
            height='100%'
            controls={true}
          />
        </div>
        <div className='col-xs-12 col-sm-6'>
          <h3>{this.props.video.responseRank}. {this.props.video.videoTitle}</h3>
          <p>{this.props.video.videoDescription}</p>
      </div>


      </div>
    )
  }
}
