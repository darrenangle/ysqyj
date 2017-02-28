import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export class ResponseStatusBlock extends Component {
  constructor(props){
    super(props);
    this.state = {
      responseComplete: this.props.response.responseComplete
    }
    this.toggleReady = this.toggleReady.bind(this);
  }

  toggleReady(){
    let newReadyState = !this.props.response.responseComplete;
    Meteor.call('response.toggleReady', this.props.response._id, newReadyState, (err,res)=>{
      if(err){ console.log(err)} else {
        // console.log(res)
      }
    });
  }

  render(){
    console.log("videos:")
    console.log(this.props.videos)
    return(
      <div className='response-status-block'>
        <h1>Editing {this.props.client.name || this.props.client.emails[0].address}{"'s"} Response </h1>
        <hr/>
        <h4>Response Status</h4><br/>
        <p>Response Complete: <strong>{this.props.response.responseComplete == false ? "false" : "true"} </strong></p>
        <p>Recap Video Uploaded? <strong>{this.props.response.recapVideoId ? "Recap Uploaded" : "No Recap Video"} </strong></p>
        <p>Other Videos Uploaded? <strong>{this.props.videos.length[0] ? "At least one video uploaded" : "No Videos Yet"} </strong></p>
        <p>Personal Message Written? <strong>{this.props.response.personalMessage ? "Personal Message Edited" : "No Personal Message Yet"} </strong></p>
        <br/>
        <button onClick={this.toggleReady} type="button" className="btn btn-success">
          Send Response to {this.props.client.name || this.props.client.emails[0].address}
        </button>

      </div>
    )
  }

}
