import React, { Component, PropTypes } from 'react';
import ReactPlayer from 'react-player'
import { Meteor } from 'meteor/meteor';
import 'meteor/edgee:slingshot'
import { EditVideoForm } from './edit-video.jsx';
import { isAdmin } from '../../../api/security/security.js';

// This needs to be refactored into smaller parts
// Uploading video vs displaying the recap component / player
// Doin too much right now.

export class RecapVideo extends Component {
  constructor(props){
    super(props);
    this.state = {
      url: "",
      posterUrl: ""
    }
    this.showEditForm = this.showEditForm.bind(this);
    this.getSignedPosterUrl = this.getSignedPosterUrl.bind(this);
  }

  componentWillMount(){
    this.getSignedUrl();
    this.getSignedPosterUrl();
  }

  getSignedUrl(){
    var t = this;
    Meteor.call('getSignedUrl.clientResponseVideo', this.props.url, Meteor.userId(), function(error, signedUrl){
      if (error) {console.log(error)} else {
        t.setState({url: signedUrl})
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

  showEditForm(event){
    if(!this.refs.editform.style.display || this.refs.editform.style.display=="none" ){
      this.refs.editform.style.display = "block";
    } else {
      this.refs.editform.style.display = "none";
    }

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
          fileConfig={{ attributes: { poster: this.state.posterUrl } }}
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
            this.state.posterUrl ? this.renderVideoEl() : "Loading..."
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
