import React, { Component, PropTypes } from 'react';
import GeneralSignUp from '../../components/email/email.jsx';
import './landing.scss'
export default class HomePageLanding extends Component {
  render(){
    return(
      <div className='container'>
        <div className='col-md-6 col-md-offset-3 margin-top-100'>
          <h1>YOU SHOULD QUIT<br/> YOUR JOB</h1>
          <hr/>
          <br/>
          <p className='landing-text'>We're working hard to help you do the work you were made for.
            <br/><br/>
            Stay tuned.
            <br/><br/>
            -Darren
          </p>
          <br/>
          <hr/>
          <br/>
          <GeneralSignUp/>
        </div>
      </div>
    )
  }
}
