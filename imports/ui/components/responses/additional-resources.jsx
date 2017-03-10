import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { SingleAdditionalResource } from './single-additional-resource.jsx';

export class AdditionalResourcesWrapper extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  renderAdditionalResources(){
    let resources = this.props.resources;
    console.log(resources);
    return resources.map((resource) => {
      return(
        <SingleAdditionalResource
          key={resource.resourceTitle}
          resource={resource}
        />
      )

    })
  }

  render(){
    return(
      <div className='additional-resources-wrapper col-xs-12 col-sm-10 col-sm-offset-1'>
        <h2>Additional Resources</h2>
        <hr/>
        {this.renderAdditionalResources()}
      </div>
    )
  }

}
