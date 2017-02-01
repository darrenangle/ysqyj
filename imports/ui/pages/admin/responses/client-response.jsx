import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Responses } from '../../../../../imports/api/responses/response-schema.js';


export class AdminClientResponse extends React.Component {
    constructor(props){
      super(props);
      this.state = {

      };
    }
    render(){
      let clientId = this.props.params.id;
      let client = this.props.client[0];
      let response = this.props.response[0];
      console.log(client,response);
      return(
        <div className='container'>Individual Response for {clientId}</div>
      )
    }

}

AdminClientResponse.propTypes = {
  client: PropTypes.array.isRequired,
  response: PropTypes.array.isRequired
}

export default createContainer( ({ params }) => {
  let clientId = params.id;
  Meteor.subscribe('singleUserById', clientId);
  Meteor.subscribe('responseByClientId', clientId);
  return {
    client: Meteor.users.find(clientId).fetch(),
    response: Responses.find({owner:clientId}).fetch()
  }
}, AdminClientResponse);
