import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
// Collections
import { Responses } from '../../../../../imports/api/responses/response-schema.js';

// Client Response (Admin View) Components
import { PersonalMessage } from './components/personal-message.jsx';
import { RecapVideo } from './components/recap-video.jsx';
import { ResponseVideoUploader } from './components/additional-video-upload.jsx';

// Styles
import './pm.scss';

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
                clientId = {clientId}
                responseId={response._id}
                videoId={response.recapVideoId}
              />
            <ResponseVideoUploader
              clientId = {clientId}
              responseId={response._id}
            />
            </div>
          </div>

        </div>
      )
    }

    render(){
      return this.props.loading ? <div>Loading..</div>: this.renderResponse();
    }

}

AdminClientResponse.propTypes = {
  client: PropTypes.array.isRequired,
  response: PropTypes.array.isRequired
}

export default createContainer( ({ params }) => {
  let clientId = params.id;
  const userSub = Meteor.subscribe('singleUserById', clientId);
  const responseSub = Meteor.subscribe('responseByClientId', clientId);
  const loading = !userSub.ready() || !responseSub.ready();
  return {
    client: Meteor.users.find(clientId).fetch(),
    response: Responses.find({owner:clientId}).fetch(),
    loading: loading
  }
}, AdminClientResponse);