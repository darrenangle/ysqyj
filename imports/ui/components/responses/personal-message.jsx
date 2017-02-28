import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import Textarea from 'react-textarea-autosize';

export class PersonalMessage extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: this.props.personalMessage || 'Personal message goes here.'
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updatePMonDoc = _.debounce(this.updatePMonDoc.bind(this), 1000)
  }

  updatePMonDoc(){
    let id = this.props.responseId;
    let message = this.state.message;
    Meteor.call(
      'response.updatePersonalMessage',
      id,
      message,
      function(err, res){
        if(err){ console.log(err)}
        if(res){ console.log(res)}
    })
  }


  handleInputChange(event){
    this.setState({message: event.target.value});
    this.updatePMonDoc();
  }

  render(){
    return(
      <p className='personal-message'>
        <Textarea
          className='personal-message-input'
          type="text"
          ref="personalMessageInput"
          value={this.state.message}
          onChange={this.handleInputChange}
          maxLength="2000"
        />
      </p>
    )
  }
}
