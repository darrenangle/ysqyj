import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { SingleResponseVideo } from './single-response-video.jsx';

export class ResponseVideoWrapper extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  renderVideos(){
    let videos = this.props.videos;
    console.log(videos);
    return videos.map((video) => {
      return(
        <SingleResponseVideo
          key={video._id}
          video={video}
        />
      )

    })
  }

  render(){
    return(
      <div className='additional-videos-wrapper col-xs-12 col-sm-10 col-sm-offset-1'>
        {this.renderVideos()}
      </div>
    )
  }

}
