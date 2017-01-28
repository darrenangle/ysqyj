import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


export class ClientStatusList extends Component {
  constructor(props){
    super(props);
    this.state = {
      hideResponseComplete: false,
    };
  }


  toggleRespondedClients(){
    this.setState({
      hideResponseComplete: !this.state.hideCompleted,
    })
  }

  renderClients(){
    let filteredClients = this.props.clients;
    if(this.state.hideResponseComplete){
      filteredClients = filteredClients.filter(client => client.responseStatus == 'Response Received')
    }
    return filteredClients.map((client) => {
      console.log(client);
      return(
        <p> Client: <strong>{client.emails[0].address}</strong></p>
      )
    })
  }

  render(){
    return(
      <div className='container'>
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
