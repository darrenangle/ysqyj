import React, { Component, PropTypes } from 'react';
import { ValidEmail, IsValidEmail} from 'meteor/froatsnook:valid-email';
import './email.scss'
import classnames from 'classnames';


export default class GeneralSignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      badEmail: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitEmail = this.submitEmail.bind(this);
  }

  submitEmail(emailAddress){
    let email = this.state.value;
    if(IsValidEmail(email)){
      console.log('valid');
      this.setState({badEmail: false});
    } else {
      console.log('invalid');
      this.setState({badEmail: true});
    }

  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.setState({badEmail: false});

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
            onChange={this.handleChange}
            placeholder="Enter your email"
          />
          <span className="input-group-btn">
            <button className="btn btn-info" type="button" onClick={this.submitEmail}>Go</button>
          </span>
        </div>
      </div>
    )
  }
}
