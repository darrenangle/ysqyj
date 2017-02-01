import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import './client-grid.scss'
import { Router, Route, Link, browserHistory } from 'react-router'


export default class SingleClientStatus extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  setResponseStatus(newResponseStatus){
    Meteor.call('client.setResponseStatus', this.props.client._id, newResponseStatus );
  }
  setAppointmentStatus(newAppointmentStatus){
    console.log(this);
    Meteor.call('client.setAppointmentStatus', this.props.client._id, newAppointmentStatus );
  }
  toggleHasPaid(){
    Meteor.call('client.toggleHasPaid',this.props.client._id, !this.props.hasPaid);
  }
  getPaidStatus(){
    if(this.props.client.hasPaid){
      return 'Paid'
    } else {
      return 'Has Not Paid'
    }
  }
  createResponse(clientId){
    Meteor.call('response.responseExists', clientId, function(err,res){
      if(err){ console.log(err)}
      console.log(res);
      if(res == false){
        console.log('response doesn\'t exist yet, creating response doc')
      } else {
        console.log('response doc already exists for this user')
      }
    })
  }

  render(){
    return(
      <div className='col-sm-12 col-md-6 col-lg-4'>
        <div className='single-client'>
          <h3>{this.props.client.name || this.props.client.emails[0].address}</h3>
          <h4>{this.props.client.emails[0].address}</h4>
          <h5>{ this.getPaidStatus()}</h5>
          <hr/>
          <h5>Appointment Status: </h5>
          <h4><strong>{this.props.client.appointmentStatus}</strong></h4>
          <p>Change Status:<br/>
            <a href='#' onClick={() =>{this.setAppointmentStatus('Scheduled')}}> Scheduled </a>
            |<a href='#' onClick={() =>{this.setAppointmentStatus('Not Scheduled')}}> Not Scheduled </a>
            |<a href='#' onClick={() =>{this.setAppointmentStatus('Complete')}}> Complete</a>
          </p>
          <hr/>
          <h5>Response Status: </h5>
          <h4><strong>{this.props.client.responseStatus}</strong></h4>
            <p>Change Status:<br/>
              <a href='#' onClick={() =>{this.setResponseStatus('Response Not Started')}}> Not Started </a>
              |<a href='#' onClick={() =>{this.setResponseStatus('Response In Progress')}}> In Progress </a>
              |<a href='#' onClick={() =>{this.setResponseStatus('Response Received')}}> Received</a>
            </p>
          <h4>
            <Link
              onClick={()=>{this.createResponse(this.props.client._id)}}
              to={`/admin/responses/${this.props.client._id}`}>
              {this.props.client.name || this.props.client.emails[0].address +"'"}s Response
            </Link>
          </h4>
        </div>
      </div>
    )

  }

}


SingleClientStatus.propTypes = {

}
