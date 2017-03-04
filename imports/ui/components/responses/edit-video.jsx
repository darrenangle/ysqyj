import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export class EditVideoForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      // Video mongodoc fields as current state
      _id: this.props.video._id,
      videoTitle: this.props.video.videoTitle,
      videoHomework: this.props.video.videoHomework,
      videoDescription: this.props.video.videoDescription,
      responseRank: this.props.video.responseRank,
      audioFileURL: this.props.video.audioFileURL,
      url: this.props.video.url,
      cdnUrl: this.props.video.cdnUrl,
      posterUrl: this.props.video.posterUrl

    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.saveEditedVideoToDB = this.saveEditedVideoToDB.bind(this);
  }

  saveEditedVideoToDB(){
    let doc = {
      responseRank: this.state.responseRank,
      videoTitle: this.state.videoTitle,
      videoDescription: this.state.videoDescription,
      videoHomework: this.state.videoHomework,
      url: this.state.url,
      audioFileURL: this.state.audioFileURL,
      cdnUrl: this.state.cdnUrl,
      posterUrl: this.state.posterUrl,
    }
    let id = this.state._id;
    Meteor.call('videos.editResponseVideo', id, doc, function(error,res){
      if(error){ console.log(error) } else {
        console.log(res);
      }
    });
  }

  handleInputChange(event){
    let stateKey = event.target.name;
    this.setState({ [stateKey] : event.target.value},function(){
      console.log(stateKey + ": " + this.state[stateKey]);
    })
  }

  render(){
    return(
      <div className="col-sm-12 video-upload-wrapper">
        <div className="input-group col-sm-12">
          <p>Video Title</p>
            <input type="text"
              className='form-control'
              value={this.state.videoTitle}
              onChange={this.handleInputChange}
              placeholder="the title of the video"
              name="videoTitle"
            /><br/><br/>
          <p>Video Description: </p>
            <input type="text" className='form-control'
              value={this.state.videoDescription}
              onChange={this.handleInputChange}
              placeholder="a description of the video"
              name="videoDescription"
            /><br/><br/>
          <p>Homework: </p>
            <input type="text" className='form-control'
              value={this.state.videoHomework}
              onChange={this.handleInputChange}
              placeholder="homework for the video"
              name="videoHomework"
          /><br/><br/>
          <p>Response Rank: </p>
          <input type="number" className='form-control'
            name="responseRank"
            min="0" max="25"
            value={this.state.responseRank}
            onChange={this.handleInputChange}
          /><br/><br/>
          <p>Audio URL </p>
          <input type="text" className='form-control'
            name="audioFileURL"
            min="0" max="500"
            value={this.state.audioFileURL}
            onChange={this.handleInputChange}
          /><br/><br/>
        <p>Poster URL </p>
        <input type="text" className='form-control'
            name="posterUrl"
            min="0" max="500"
            value={this.state.posterUrl}
            onChange={this.handleInputChange}
        /><br/><br/>
        <p>CDN URL </p>
            <input type="text" className='form-control'
              name="cdnUrl"
              min="0" max="500"
              value={this.state.cdnUrl}
              onChange={this.handleInputChange}
          /><br/><br/><br/>
        <button type = "button" className= "btn btn-primary" onClick={this.saveEditedVideoToDB}>Save Edits</button>
        </div>
      </div>

    )
  }

}
