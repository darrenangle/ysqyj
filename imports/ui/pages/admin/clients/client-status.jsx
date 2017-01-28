import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


export class ClientStatusList extends Component {

  renderClients(){

  }

  render(){
    return(
      <div>
        <h1>Client Status List</h1>
        <ul>
          { this.renderClients() }
        </ul>
      </div>
    )
  }
}

ClientStatusList.propTypes = {
  clients: PropTypes.array.isRequired,
  clientCount: PropTypes.number.isRequired,
}


export default createContainer( () => {
  Meteor.subscribe('userList');
  return {
    clients: Meteor.users.find({}, { sort: {createdAt: -1} }).fetch(),
    clientCount: Meteor.users.find().count() -1
  }

}, ClientStatusList);
