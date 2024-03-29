import React, { Component, PropTypes } from 'react';
import { ValidEmail, IsValidEmail} from 'meteor/froatsnook:valid-email';
import './email.scss'
import classnames from 'classnames';


export default class GeneralSignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      badEmail: false,
      submitted: false,
      stateField: "juice"
    };
    this.inputChange = this.inputChange.bind(this);
    this.submitEmail = this.submitEmail.bind(this);
  }

  submitEmail(){
    let email = this.state.value;
    if(IsValidEmail(email)){
      let t = this;
      Meteor.call('addEmailtoGeneralList', email, function(err,res){
        if(err){
          console.log(err);
        } else {
          console.log(res);
          t.setState({
            value: 'Thanks! More soon.',
            submitted: true
          });
        }

      })
      this.setState({badEmail: false});
    } else {
      console.log('invalid');
      this.setState({badEmail: true});
    }

  }

  inputChange(event) {
    this.setState({value: event.target.value});
    this.setState({badEmail: false});
    let stateKey = event.target.name;
    this.setState({[stateKey]: event.target.value}, function(){
      console.log(stateKey + ": " + this.state[stateKey]);
    });
  }

  render(){
    let inputClassnames = classnames('form-control', {badEmail: this.state.badEmail });
    return(
      <div className="col-sm-8 email-wrapper">
        <p className='email-signup-copy'>Sign up for our mailing list:</p>
        <div className="input-group">
          <input type="text"
            ref="emailInput"
            className={inputClassnames}
            value={this.state.value}
            onChange={this.inputChange}
            placeholder="Enter your email"
            disabled={this.state.submitted}
            name="stateField"
          />
          <span className="input-group-btn">
            <button className="btn btn-info" type="button" onClick={this.submitEmail}>Go</button>
          </span>
        </div>
      </div>
    )
  }
}
