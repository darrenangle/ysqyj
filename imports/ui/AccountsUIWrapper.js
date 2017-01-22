import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default class AccountsUIWrapper extends Component {
  componentDidMount(){
    // Use blaze to render login buttons
    this.view = Blaze.render( Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.accountswrapper));
  }
  componentWillUnmount(){
    // Remove Blaze View on Unmount
    Blaze.remove(this.view);
  }
  render(){
    return <span ref="accountswrapper" />
  }
}
