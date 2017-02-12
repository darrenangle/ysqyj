import React, { Component, PropTypes } from 'react';

export class PersonalMessage extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    return(
      <div>
        <p>This is the personal message module</p>
        <h3>{this.props.personalMessage}</h3>
      </div>

    )
  }
}
