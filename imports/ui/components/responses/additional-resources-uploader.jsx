import React, { Component, PropTypes } from 'react';
export class AdditionalResourcesUploader extends Component {
	constructor(props){
		super(props);
		this.state = {
			resourceTitle: "",
			resourceUrl: "",
			resourceDescription: ""
		}
		this.saveAdditionalResourceToDB = this.saveAdditionalResourceToDB.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	resetState(){
		this.setState({
			resourceTitle: "",
			resourceUrl: "",
			resourceDescription: ""
		})
	}
	saveAdditionalResourceToDB(){
		let t = this;
		let doc = {
			resourceTitle: this.state.resourceTitle,
			resourceUrl: this.state.resourceUrl,
			resourceDescription: this.state.resourceDescription
		}
		let responseId = this.props.responseId;
		Meteor.call('response.uploadAdditionalResource', responseId, doc, (err,res) => {
			if(err){console.log(err)} else {
				t.resetState();
			}
		});
	}

	handleInputChange(event){
	    let stateKey = event.target.name;
	    this.setState({ [stateKey] : event.target.value},function(){
	      console.log(stateKey + ": " + this.state[stateKey]);
	    })
	  }

	render(){
		return(
			<div className='additional-resources-uploader col-sm-12'>
				<div className='input-group col-sm-12'>
					<p>Additional Resource Title</p>
					<input type="text"
		              className='form-control'
		              value={this.state.resourceTitle}
		              onChange={this.handleInputChange}
		              placeholder="the title of the resource"
		              name="resourceTitle"
		            /><br/><br/>
		            <p>Additional Resource Description</p>
					<input type="text"
		              className='form-control'
		              value={this.state.resourceDescription}
		              onChange={this.handleInputChange}
		              placeholder="a description of the resource"
		              name="resourceDescription"
		            /><br/><br/>
		            <p>Additional Resource URL</p>
					<input type="text"
		              className='form-control'
		              value={this.state.resourceUrl}
		              onChange={this.handleInputChange}
		              placeholder="URL of the resource"
		              name="resourceUrl"
		            /><br/><br/><br/>
					<button type = "button" className= "btn btn-primary" onClick={this.saveAdditionalResourceToDB}>Save Resource</button>
				</div>
			</div>
		)
	}
}