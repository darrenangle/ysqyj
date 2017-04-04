import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import Navbar from '../../components/nav/nav.jsx';

export default class CoachingApplication extends Component {
  renter(){
    return(
      <div>
        <Navbar/>
        <div className='coaching-application-wrapper container'>
          <div className='coaching-header-wrapper'>
            <h2>You’re doing it. You’re taking the leap! YES! Bravo! <br/>.</h2>
            <h4>Doing the work you were made for isn’t easy. But it is easily one of the most effective ways to improve your life dramatically.<br/>
            If you’re ready to discover what you’re <i>really</i> here to do<br/> and give your new career path all that you’ve got,<br/> you should feel proud that you’re starting today.</h4>
            <p>(I’m proud of you, and we haven't even met!)</p>

            <p>Before we meet, I’d like to get to know you better.</p>
            <p>Your answers will help me make sure we’re a good fit for each other, and help me structure and prepare our one-on-ones as effectively as possible.</p>
            <p>Once I’ve reviewed your application, I’ll reach out to schedule our first meeting (and send you a private link for payment).</p>

            <p>Please email me at darren@youshouldquityourjob.com if you have any questions. Looking forward to meeting you!</p>


          </div>
        </div>
      </div>
    )
  }
}
