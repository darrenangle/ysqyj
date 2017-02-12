import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// Components
import { PersonalMessage } from './components/personal-message.jsx';
import { RecapVideo } from './components/recap-video.jsx';
import { ResponseVideoWrapper } from './components/response-video-wrapper.jsx';
import { Downloads } from './components/downloads.jsx';

import './styles/response.scss';

export class ClientResponse extends Component {

  renderLogin(){

  }

  renderResponse(){

    let clientId = this.props.params.id;
    let client = this.props.client[0];
    let response = this.props.response[0];
    let recapvid = this.props.recapVideo[0] || {url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'};

    return(
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-sm-10 col-sm-offset-1'>
            <h1>Response for {client.name}</h1>
            <hr/><br/>
            <PersonalMessage
              responseId={response._id}
              personalMessage={response.personalMessage || 'No Personal Message Yet'}
            />
            <hr/><br/>
            <RecapVideo
              url={recapvid.url}
            />
          </div>
        </div>
        <ResponseVideoWrapper
          videos={this.props.videos}
          responseId={response._id}
          clientId={clientId}
        />
      </div>
    )


  }

  render(){
    return this.props.loading ? <div>Loading..</div>: this.renderResponse();
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
