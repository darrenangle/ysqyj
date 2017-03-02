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
      videoHomework:"",
      hasTranscript: false,
      transcriptText: "",
      transcriptFileURL: "",
      additionalfileURLs: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.saveVideoDocToDB = this.saveVideoDocToDB.bind(this);
    this.uploadVideo = this.uploadVideo.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  resetState(){
    this.setState(
      {
        formComplete: false, owner: this.props.clientId, responseId: this.props.responseId,
        url: "", isRecapVideo: false, responseRank: 0,videoTitle: "",
        videoDescription: "", hasTranscript: false, transcriptText: "",
        transcriptFileURL: "", additionalfileURLs: []
      }
    )
    document.getElementById('response-video-input').value='';

  }

  componentWillMount(){
    Slingshot.fileRestrictions("ResponseVideo",{
      allowedFileTypes: ["video/mp4", "video/quicktime"],
      maxSize: null
    })
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
      videoHomework: this.state.videoHomework,
      hasTranscript: this.state.hasTranscript,
      url: this.state.url,
      audioFileURL: this.state.audioFileURL,
      transcriptText: this.state.transcriptText,
      transcriptFileURL: this.state.transcriptFileURL,
      createdAt: new Date()
    }
    console.log(doc);

    var t = this;
    Meteor.call('videos.uploadResponseVideo', doc, function(err,res){
      if(err){ console.log(error) } else {
        console.log(res);
        t.resetState();
      }
    })

  }

  handleInputChange(event){
    // Input fields for this form have a 'name' attribute equal to their corresponding state key
    // so that state key can be passed through the event and set dynamically
    let stateKey = event.target.name;
    this.setState({[stateKey]: event.target.value}, function(){
      console.log(stateKey + ": " + this.state[stateKey]);
    });
  }

  uploadVideo(){
    let t = this;
    // Upload info is Slingshot's 'metaContext' field renamed for clarity
    // use this object to pass fields into the S3 file paths in the slingshot Rule
    let metaContext = {
      clientId: this.state.owner
    }
    let uploader = new Slingshot.Upload("ResponseVideo", metaContext);
    // Send the upload to S3 via slingshot
    uploader.send(
      document.getElementById('response-video-input').files[0],
      function(error,fileURL){
        if(error){
          console.error('Error uploading', uploader.xhr.response);
        } else {
          // File upload successful, S3 URL in fileURL variable
          t.setState({url: fileURL}, function(){
            console.log(t.state.url);
          })

          console.log(fileURL);
        }
      });
      this.timer = setInterval(() => {
        console.log(Math.ceil(uploader.progress() * 100))
        if (Math.ceil(uploader.progress() * 100) === 100) {
          clearInterval(this.timer);
        }
      }, 1000);
  }

  render(){

    let recapBool = false;

    return(
      <div className="col-sm-12 video-upload-wrapper">
        <h3 className=""> Upload a video for this response: </h3>
        <div className="input-group">
          <p>Video Title</p>
            <input type="text"
              className='form-control'
              value={this.state.videoTitle}
              onChange={this.handleInputChange}
              placeholder="the title of the video"
              name="videoTitle"
            /><br/>
          <p>Video Description: </p>
            <input type="text" className='form-control'
              value={this.state.videoDescription}
              onChange={this.handleInputChange}
              placeholder="a description of the video"
              name="videoDescription"
            /><br/>
          <p>Homework: </p>
              <input type="text" className='form-control'
                value={this.state.videoHomework}
                onChange={this.handleInputChange}
                placeholder="homework for the video"
                name="videoHomework"
              /><br/>
          <p>Response Rank: </p>
          <input type="number" className='form-control'
            name="responseRank"
            min="0" max="25"
            value={this.state.responseRank}
            onChange={this.handleInputChange}
          />
        <label>This is a recap video
          <input
            name="isRecapVideo" className='form-control'
            id="isRecapVideo"
            type="checkbox"
            value={this.state.isRecapVideo}
            onChange={ (e) => {
              // This is some nonsense I had to do to tie a Boolean
              // To a checkbox
              let bool = !this.state.isRecapVideo;
              let fakeevent = {
                target: {
                  name: "isRecapVideo",
                  value: bool
                }
              }
              this.setState({isRecapVideo: bool}, function(){
                this.handleInputChange(fakeevent);
              });
            }}
          />
         </label>
         <p>Upload video file: </p>
        <input className='form-control' type="file" id="response-video-input" onChange={this.uploadVideo} />
        </div><br/>
      <p>Manually input URL </p>
        <input type="text" className='form-control'
          name="url"
          min="0" max="500"
          value={this.state.url}
          onChange={this.handleInputChange}
        />
      <button type = "button" className= "btn btn-primary" onClick={this.saveVideoDocToDB}>Upload Video Doc</button>
        <br/>
      </div>
    )

  }

}
