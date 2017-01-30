import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import './client-grid.scss'

export default class SingleClientStatus extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  setResponseStatus(newResponseStatus){
    Meteor.call('client.setResponseStatus', this.props.id, newResponseStatus );
  }
  setAppointmentStatus(newAppointmentStatus){
    console.log(this);
    Meteor.call('client.setAppointmentStatus', this.props.id, newAppointmentStatus );
  }
  toggleHasPaid(){
    Meteor.call('client.toggleHasPaid',this.props.id, !this.props.hasPaid);
  }
  testEvent(a,b,c){
    console.log(this.refs[0])
    console.log(a,b,c);
    console.log(this);
  }

  getPaidStatus(){
    if(this.props.hasPaid){
      return 'Paid'
    } else {
      return 'Has Not Paid'
    }
  }

  render(){
    return(
      <div className='col-sm-12 col-md-6 col-lg-4'>
        <div className='single-client'>
          <h3>{this.props.name}</h3>
          <h4>{this.props.emails[0].address}</h4>
          <h5>{ this.getPaidStatus()}</h5>
          <hr/>
          <h5>Appointment Status: </h5>
          <h4><strong>{this.props.appointmentStatus}</strong></h4>
          <p>Change Status:<br/>
            <a href='#' onClick={() =>{this.setAppointmentStatus('Scheduled')}}> Scheduled </a>
            |<a href='#' onClick={() =>{this.setAppointmentStatus('Not Scheduled')}}> Not Scheduled </a>
            |<a href='#' onClick={() =>{this.setAppointmentStatus('Complete')}}> Complete</a>
          </p>
          <hr/>
          <h5>Response Status: </h5>
          <h4><strong>{this.props.responseStatus}</strong></h4>
            <p>Change Status:<br/>
              <a href='#' onClick={() =>{this.setResponseStatus('Response Not Started')}}> Not Started </a>
              |<a href='#' onClick={() =>{this.setResponseStatus('Response In Progress')}}> In Progress </a>
              |<a href='#' onClick={() =>{this.setResponseStatus('Response Received')}}> Received</a>
            </p>
        </div>
      </div>
    )

  }

}


SingleClientStatus.propTypes = {

}
