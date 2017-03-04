import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
// Collections
import { Responses } from '../../../../../imports/api/responses/response-schema.js';
import { ResponseVideos } from '../../../../../imports/api/video/response-video-schema.js';

// Client Response (Admin View) Components
import { PersonalMessage } from '../../../components/responses/personal-message.jsx';
import { RecapVideo } from '../../../components/responses/recap-video.jsx';
import { ResponseVideoUploader } from '../../../components/responses/additional-video-upload.jsx';
import { AdditionalVideosWrapper } from '../../../components/responses/additional-videos.jsx';
import { ResponseStatusBlock } from '../../../components/responses/response-status-block.jsx';

// Styles
import '../../../components/responses/pm.scss';

export class AdminClientResponse extends React.Component {
    constructor(props){
      super(props);
      this.state = {
      };
    }

    renderResponse(){
      let clientId = this.props.params.id;
      let client = this.props.client[0];
      let response = this.props.response[0];
      let recapvid = this.props.recapVideo[0] || {cdnUrl:'http://techslides.com/demos/sample-videos/small.webm'};
      let additionalVideos = this.props.videos;
      return(
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-sm-10 col-sm-offset-1'>
              <ResponseStatusBlock
                response = {response}
                client = {client}
                videos = {additionalVideos}
              />
            <br/><hr/><br/>
                <ResponseVideoUploader
                  clientId = {clientId}
                  responseId={response._id}
                />
              <h1>Preview Response For {client.name || client.emails[0].address}</h1>


              <br/><hr/><br/>
              <PersonalMessage
                responseId={response._id}
                personalMessage={response.personalMessage || 'No Personal Message Yet'}
              />
              <hr/><br/>
              <RecapVideo
                video={recapvid}
                url={recapvid.cdnUrl}
              />
            </div>
          </div>
          <AdditionalVideosWrapper
            videos={additionalVideos}
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

AdminClientResponse.propTypes = {
  client: PropTypes.array.isRequired,
  response: PropTypes.array.isRequired,
  recapVideo: PropTypes.array.isRequired,
  videos: PropTypes.array.isRequired
}

export default createContainer( ({ params }) => {
  let clientId = params.id;
  const userSub = Meteor.subscribe('singleUserById', clientId);
  const responseSub = Meteor.subscribe('responseByClientId', clientId);
  const videosSub = Meteor.subscribe('videosByOwner', clientId);

  const loading = !videosSub.ready() || !userSub.ready() || !responseSub.ready();
  return {
    client: Meteor.users.find(clientId).fetch(),
    response: Responses.find({owner:clientId}).fetch(),
    recapVideo: ResponseVideos.find({owner: clientId, isRecapVideo: true}).fetch(),
    videos:ResponseVideos.find({owner: clientId, isRecapVideo: false}, {sort: {responseRank:1 }}).fetch(),
    loading: loading
  }
}, AdminClientResponse);
