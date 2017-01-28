import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import './client-grid.scss'

export default class SingleClientStatus extends Component {
  setResponseStatus(newResponseStatus){
    Meteor.call('client.setResponseStatus', this.props.client._id, newResponseStatus );
  }
  setAppointmentStatus(newAppointmentStatus){
    Meteor.call('client.setAppointmentStatus', this.props.client._id, newAppointmentStatus );
  }
  toggleHasPaid(){
    Meteor.call('client.toggleHasPaid',this.props.client._id, !this.props.client.hasPaid);
  }
  render(){

    return(
      <div className='single-client col-sm-12 col-md-6 col-lg-4'>
        <h3>{this.props.name}</h3>
        <h3>{this.props.emails[0].address}</h3>
      </div>
    )

  }

}


SingleClientStatus.propTypes = {
  client: PropTypes.object.isRequired
}
