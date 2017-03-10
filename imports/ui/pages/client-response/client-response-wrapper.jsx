import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


// publications
import { Responses } from '../../../../imports/api/responses/response-schema.js';
import { ResponseVideos } from '../../../../imports/api/video/response-video-schema.js';


// Components
import { PersonalMessage } from '../../components/responses/personal-message.jsx';
import { RecapVideo } from '../../components/responses/recap-video.jsx';
import { AdditionalVideosWrapper } from '../../components/responses/additional-videos.jsx';
import { ResponseLogin } from '../../components/responses/response-login.jsx';
import { AdditionalResourcesWrapper } from '../../components/responses/additional-resources.jsx';

import '../../components/responses/pm.scss';

export class ClientResponse extends Component {
  constructor(props){
    super(props);
    this.state = {
      response: "",

    }
  }

  componentWillMount(){

  }

  renderNoResponse(){
    return(
      <div className='response-not-ready'>
            <h1>Your response will be ready soon!</h1>
      </div>
    )
  }

  renderResponse(){

    let clientId = Meteor.userId();
    let client = this.props.client[0];
    let response = this.props.response[0];
    let recapvid = this.props.recapVideo[0] || {cdnUrl:'http://techslides.com/demos/sample-videos/small.webm'};
    let additionalVideos = this.props.videos;
    let additionalResources = this.props.response[0].additionalResources || [];


    if(!response || !response.responseComplete){
      return(
        <div className='response-not-ready'>
              <h1>Your response will be ready soon!</h1>
        </div>
      )
    }

    return(
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-sm-10 col-sm-offset-1'>
            <h1>Response for {client.name}</h1>
            <hr/><br/>
            <PersonalMessage
              responseId={response._id}
              personalMessage={response.personalMessage || 'No Personal Message Yet'}
              disabled={true}
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
        <AdditionalResourcesWrapper
            resources={additionalResources}
        />
      </div>
    )

  }

  render(){
    if(Meteor.user()){
      return  this.props.loading  ? <div>Loading..</div> : this.renderResponse()
    } else {
      return (<ResponseLogin/>)
    }

  }
}

ClientResponse.propTypes = {
  client: PropTypes.array.isRequired,
  response: PropTypes.array.isRequired,
  recapVideo: PropTypes.array.isRequired,
  videos: PropTypes.array.isRequired
}

export default ClientResponseContainer = createContainer( ({ params }) => {
  let clientId = Meteor.userId();
  const userSub = Meteor.subscribe('singleUserById', clientId);
  const responseSub = Meteor.subscribe('currentUserResponse');
  const videosSub = Meteor.subscribe('videosByOwner', clientId);

  const loading = !videosSub.ready() || !userSub.ready() || !responseSub.ready();
  return {
    loading: loading,
    client: Meteor.users.find(clientId).fetch(),
    response: Responses.find({owner:clientId}).fetch(),
    recapVideo: ResponseVideos.find({owner: clientId, isRecapVideo: true}).fetch(),
    videos:ResponseVideos.find({owner: clientId, isRecapVideo: false}, {sort: {responseRank:1 }}).fetch(),
  }
}, ClientResponse);
