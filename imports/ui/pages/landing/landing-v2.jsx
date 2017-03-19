import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import Navbar from '../../components/nav/nav.jsx';
import Header from './components/header.jsx';
import './landing-v2.scss';

export default class LandingPageV2 extends Component {
  render(){
    return(
    <div>
    	<Navbar/>
    	<div className='landing-page-wrapper container-fluid'>
        <div className='landing-header-wrapper offwhite-background '>
          <div className='headline-quote-wrapper'>
              <div className='headline-quote'>
                <h1>“I don’t want to sit around and <br/> watch <i>another year</i> go by.<br/>
                I’m just not sure what to do <i>next</i>.​‌”
                </h1>
              </div>
              <hr className='short-divider'/>
            </div>
            <div className='subheadline-wrapper'>
              <h2 className='subheadline'>
                HOW TO STOP TROLLING YOURSELF<br/>
                AND TAKE A MEANINGFUL STEP<br/>
                TOWARD A CAREER THAT MATTERS TO YOU<br/>
              <span className='tiny-joke'>(EVEN IF YOU HAVE NO IDEA WHAT YOU’RE DOING)</span><br/>
              <span className='tinier-joke'>and you fuck things up sometimes</span><br/>

              </h2>
          </div>
        </div>




      </div>
    </div>

    )
  }
}
