import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// Components
import { PersonalMessage } from './components/personal-message.jsx';
import { RecapVideo } from './components/recap-video.jsx';
import { ResponseVideoWrapper } from './components/response-video-wrapper.jsx';
import { Downloads } from './components/downloads.jsx';


export class ClientResponse extends Component {

  renderLogin(){

  }

  renderResponse(){

  }

  render(){
    return(
      <div></div>
    )
  }
}

ClientResponse.propTypes = {
  response: PropTypes.array.isRequired,
  recapVideo: PropTypes.array.isRequired,
  videos: PropTypes.array.isRequired
}

export default createContainer( ({ params }) => {
  let clientId = Meteor.userId();
  const userSub = Meteor.subscribe('singleUserById', clientId);
  const responseSub = Meteor.subscribe('responseByClientId', clientId);
  const videosSub = Meteor.subscribe('videosByOwner', clientId);
  const loading = !userSub.ready() || !videosSub.ready() || !responseSub.ready();

  return {
    client: Meteor.users.find(clientId).fetch(),
    response: Responses.find({owner:clientId}).fetch(),
    recapVideo: ResponseVideos.find({owner: clientId, isRecapVideo: true}).fetch(),
    videos:ResponseVideos.find({owner: clientId, isRecapVideo: false}).fetch(),
    loading: loading
  }

}, ClientResponse);
