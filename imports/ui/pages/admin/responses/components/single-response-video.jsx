import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactPlayer from 'react-player'

export class SingleResponseVideo extends Component {
  constructor(props){
    super(props);
    this.state={

    }
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
            url={this.props.video.url}
            width="100%"
            height='100%'
            controls={true}
          />
        </div>
        <div className='col-xs-12 col-sm-6'>
          <h4>{this.props.video.responseRank}. {this.props.video.videoTitle}</h4>
          <p>{this.props.video.description}</p>
      </div>


      </div>
    )
  }
}
