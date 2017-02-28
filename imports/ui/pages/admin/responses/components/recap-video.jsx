import React, { Component, PropTypes } from 'react';
import ReactPlayer from 'react-player'
import { Meteor } from 'meteor/meteor';
import 'meteor/edgee:slingshot'

// This needs to be refactored into smaller parts
// Uploading video vs displaying the recap component / player
// Doin too much right now.

export class RecapVideo extends Component {
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
    Meteor.call('getSignedUrl.clientResponseVideo', this.props.url, Meteor.userId(), function(error, signedUrl){
      if (error) {console.log(error)} else {
        t.setState({url: signedUrl})
      }
    })
  }


  renderVideoEl(){

    return(
      <div className='row'>
        <ReactPlayer
          className='col-xs-12'
          url={this.state.url}
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
