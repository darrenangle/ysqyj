import React, { Component, PropTypes } from 'react';
export class SingleAdditionalResource extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    return(
      <div className='single-additional-resource'>
        <h3>
          <a href={this.props.resource.resourceUrl} target="_blank">
            {this.props.resource.resourceTitle}
          </a>
        </h3>
        <p>{this.props.resource.resourceDescription}</p>
      </div>
    )
  }
}
