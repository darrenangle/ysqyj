import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import Navbar from '../../components/nav/nav.jsx';
import './coaching-app.scss';
import {Form, Field} from 'simple-react-form';
import Text from 'simple-react-form-material-ui/lib/text';
import Textarea from 'simple-react-form-material-ui/lib/textarea';
import MultipleCheckbox from 'simple-react-form-material-ui/lib/multiple-checkbox';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';

injectTapEventPlugin();

export default class CoachingApplication extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  getCareerHelpChoices(){
    return [
      {label: 'I want help choosing what to do next', value: 'choosing-next-career'},
      {label: 'I want to quit my current job', value: 'quit-current-job'},
      {label: 'I want to change careers', value: 'change-careers'},
      {label: 'I want a raise or a promotion at work', value: 'raise-or-promotion'},
      {label: 'I want to do more work on the side', value: 'side-business'},
      {label: 'I want more time for things that matter', value: 'more-time'},
      {label: 'I wish I could get paid to do what I love', value: 'paid-for-fun'}
    ]
  }
  submitConsultationRequest(){

  }
  render(){
    return(
      <MuiThemeProvider>
      <div>
        <Navbar/>
          <div className='coaching-application-wrapper container-fluid'>
            <div className='coaching-header-wrapper'>
                <h2>Doing the work you were made for isn’t easy.</h2>
                <h3>
                  <strong>
                    But it is easily one of the most effective ways to improve your life and feel more free.
                    </strong>
                </h3>
                <h3 className='coaching-application-ifyrready'>
                  If you’re ready to discover what you’re <i>really</i> here to do,
                  <br/> and you're ready to give your new career <i>all that you’ve got,</i>
                  <br/> you should feel proud that you’re <i>starting today.</i>
                </h3>
                  <p>(I’m proud of you, and we haven't even met!)</p>
                </div>

                <div className='coaching-application-teaser col-xs-12'>
                  <p className='tiny-heading'>APPLY FOR COACHING</p>
                  <p>(You’re doing it. You’re taking the leap! YES! Bravo!)</p>
                </div>
            </div>

          <div className='coaching-application-form-wrapper container'>
            <div className='col-sm-10 col-sm-offset-1'>
              <h3>Before we meet, I’d like to get to know you better.</h3>
              <h4>Your answers will help me make sure we’re a good fit for each other, and help me structure and prepare our one-on-ones as effectively as possible.</h4>
              <p>Once I’ve reviewed your application, I’ll reach out to schedule our first meeting (and send you a private link for payment).</p>
              <p>Please email me at darren@youshouldquityourjob.com if you have any questions. Looking forward to meeting you!</p>
            </div>
            <div className='coaching-application-form col-sm-10 col-sm-offset-1'>
              <Form state={this.state} className='col-sm-10' onChange={changes => this.setState(changes)}>
                <p><br/><strong>Your contact info:</strong></p>
                <Field fieldName='firstName' label='First Name' type={Text}/>
                <Field fieldName='lastName' label='Last Name' type={Text}/>
                <Field fieldName='email' label='Your Best Email Address' type={Text}/><br/>
                <p><br/><strong>What can I help you with? (Select all that apply)</strong></p>
                <Field fieldName='helpWithTheseIssues' label='' type={MultipleCheckbox} options={this.getCareerHelpChoices()}/>

                <h3>Revealing Questions</h3>
                <p>These questions were written, tested, and rewritten to reveal as much about you and your situation as possible. Take your time, but don't erase. Everything you write is valuable to our work together! EVERYTHING!</p>
                <p class='survey-question'><br/><strong>1. If you had $10,000 to spend on yourself (not debts, bills, or family), what would you buy and why?</strong></p>
                <Field className='' fieldName='10K-question' label='Type your answer here' hintText='Go crazy!' type={Textarea} rows={2}/>
                <p class='survey-question'><br/><strong>2. What is the ideal situation you hope to find yourself in professionally and creatively? If you 'had it all', on your terms, what would that look like? What are you doing every day?</strong></p>
                <Field className='' fieldName='ideal-career-question' label='Type your answer here' hintText='Don’t hold back!' type={Textarea} rows={2}/>
                <p class='survey-question'><br/><strong>3. What do you think are your biggest obstacles to experiencing some or all of that dream?</strong></p>
                <Field className='' fieldName='obstacles-question' label='Type your answer here' hintText='Be honest!' type={Textarea} rows={2}/>
                <p class='survey-question'><br/><strong>4. How might someone who doesn't know you all that well describe your bad habits? What would a well-intentioned stranger say is holding you back?</strong></p>
                <Field className='' fieldName='outsider-perspective-question' label='Type your answer here' hintText='This one’s tough. You got it!' type={Textarea} rows={2}/>
                <p class='survey-question'><br/><strong>5. If we only talked about one problem, what would you want it to be? What would you give attention to?</strong></p>
                <Field className='' fieldName='biggest-issue-question' label='Type your answer here' hintText='What’s *really* important?' type={Textarea} rows={2}/>
                <RaisedButton className='send-application-button' label="SEND APPLICATION" primary={true} />
            </Form>

              <p>
                {JSON.stringify(this.state, null, 2)}
              </p>
            </div>

          </div>


      </div>
      </MuiThemeProvider>
    )
  }
}
