import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export class ResponseLogin extends Component {
  constructor(props){
    super(props);
    this.state = {
      emailAddress:"",
      password: ""
    }
    this.submitEmail=this.submitEmail.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

  }

  submitEmail(){
    let email  = this.state.emailAddress;
    let password = this.state.password;
    new SimpleSchema({
      email: {
        type:String,
        regEx: SimpleSchema.RegEx.Email
      },
      password: {
        type:String,
        max:50
      }
    }).validate({email, password});

    Meteor.loginWithPassword(email,password, (err) => {
      if(err){ console.log(err) };
    })
  }

  handleInputChange(event){
    let stateKey = event.target.name;
    this.setState({[stateKey]: event.target.value}, function(){
      console.log(stateKey + ": " + this.state[stateKey]);
    });
  }

  render(){
    return(
      <div className='response-not-ready container'>
        <div className='response-login-wrapper col-xs-12 col-sm-6 col-sm-offset-3'>
          <h3>Login to view your response:</h3><br/>
            <div className="form-group">
              <input onChange={this.handleInputChange} type="email" name="emailAddress" className="form-control" placeholder="Enter your email"/>
              <br/>
              <input onChange={this.handleInputChange} type="password" name="password" className="form-control" placeholder="Enter your password"/>
              <br/>
              <br/>
              <button onClick={this.submitEmail} type="button" className="col-xs-12 btn btn-success"> Login </button>
            </div>
        </div>
      </div>
    )
  }

}
