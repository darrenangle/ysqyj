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
    this.getVideoURLbyID();
    this.state = {
      recapVideoId: this.props.videoId || "",
      recapVideoURL: ""
    }
  }
  componentWillMount(){
    Slingshot.fileRestrictions("RecapVideo",{
      allowedFileTypes: ["video/mp4", "video/quicktime"],
      maxSize: null
    })
  }

  getVideoURLbyID(){
    console.log('getting video URL for '+ this.props.videoId);
    let t = this;
    Meteor.call('videos.getVideoURLbyID', this.props.videoId, function(err,res){
      if (err) { console.log(err) } else {
        console.log(res);
        t.setState({recapVideoURL: res});
      }
    })
  }

  uploadVideo(){
    let t = this;
    let metaContext = {
      clientId: this.props.clientId
    }
    let uploader = new Slingshot.Upload("RecapVideo", metaContext);
    uploader.send(document.getElementById('recapVidInput').files[0], function(error, s3Url){
      if (error) {
        console.error('Error uploading', uploader.xhr.response);
      } else {

        let doc = {
          url: s3Url,
          client: t.props.clientId,
          response: t.props.responseId
        }
        Meteor.call('videos.uploadNewRecapVideo', doc, function(err,res){
          if(error){ console.log(error) } else {
          }
        })
      }
    })
  }

  renderVideoEl(){

    return(
      <div className='row'>
        <ReactPlayer
          className='col-xs-12'
          url={this.state.recapVideoURL}
          width="100%"
          height='100%'
          controls={true}
        />
      </div>
    )
  }
  renderVideoUpload(){
    return(
      <div className='container'>
        <h4>No recap video uploaded yet. Upload one below!</h4>
        <input type="file" id="recapVidInput" onChange={this.uploadVideo.bind(this)} />
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
