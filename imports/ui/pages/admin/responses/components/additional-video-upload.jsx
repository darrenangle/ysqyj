// This is a form for uploading additional videos in the admin section
import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import 'meteor/edgee:slingshot'

export class ResponseVideoUploader extends Component {
  constructor(props){
    super(props);
    this.state = {
      // Form State to prevent upload missing required fields
      formComplete: false,

      // Video mongodoc fields as current state
      owner: this.props.clientId,
      responseId: this.props.responseId,
      url: "",
      isRecapVideo: false,
      responseRank: 0,
      videoTitle: "",
      videoDescription: "",
      hasTranscript: false,
      transcriptText: "",
      transcriptFileURL: "",
      additionalfileURLs: []
    }
  }
  componentWillMount(){
    Slingshot.fileRestrictions("ResponseVideo",{
      allowedFileTypes: ["video/mp4", "video/quicktime"],
      maxSize: null
    })
  }

  formComplete(){
    // Check required fields, set formComplete state field
    if(   !this.state.url ||
          !this.state.videoTitle ||
          !this.state.videoDescription )
      {
          this.setState({formComplete:false})
      }

    if( this.state.isRecapVideo == false && this.state.responseRank < 1 ){
        this.setState({formComplete:false})
    }
    this.setState({formComplete:true})
  }

  saveVideoDocToDB(){
    // Video file uploaded, form complete, now upload to app database
    let doc = {
      owner: this.state.owner,
      responseId: this.state.responseId,
      isRecapVideo: this.state.isRecapVideo,
      responseRank: this.state.responseRank,
      videoTitle: this.state.videoTitle,
      videoDescription: this.state.videoDescription,
      hasTranscript: this.state.hasTranscript,
      url: this.state.url,
      audioFileURL: this.state.audioFileURL,
      transcriptText: this.state.transcriptText,
      transcriptFileURL: this.state.transcriptFileURL
    }

  }

  handleInputChange(event){
    let stateKey = event.target.name;
    this.setState({[stateKey]: event.target.value}, function(){
      console.log(stateKey + ": " + this.state[stateKey]);
    });
    this.formComplete();
  }

  uploadVideo(){
    let t = this;
    // Upload info is Slingshot's 'metaContext' field renamed for clarity
    // use this object to pass fields into the S3 file paths in the slingshot Rule
    let uploadInfo = {
      clientId: this.state.clientId
    }
    let uploader = new Slingshot.Upload("ResponseVideo", uploadInfo);
    // Send the upload to S3 via slingshot
    uploader.send(
      document.getElementById('response-video-input').files[0],
      function(error,fileURL){
        if(error){
          console.error('Error uploading', uploader.xhr.response);
        } else {
          // File upload successful, S3 URL in fileURL variable
          t.setState({url: fileURL})
        }
      })
  }
  render(){
    <div>

    </div>
  }

}
