import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

const INSTANCE = this;
const GHOSTBUSTERS_LOGO = 'https://tmc-post-content.s3.amazonaws.com/ghostbusters-logo.png';


export default class SignupForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedService: false,
      processing: false,
      userEmail: 'darren.r.angle@gmail.com'
    }
  }

    componentWillMount() {
      const SELF = this;
      {/* Configure the call for the Stripe API */}
      INSTANCE.checkout = INSTANCE.StripeCheckout.configure({
        key: Meteor.settings.public.stripe,
        image: GHOSTBUSTERS_LOGO,
        locale: 'auto',
        token(token) {
          const { selectedService } = SELF.state;
          const charge = {
            amount: token.amount || 19999,
            currency: token.currency || 'usd',
            source: token.id,
            description: token.description || "Breakthrough 1-on-1",
            receipt_email: token.email,
          };
          {/* Call the processPayment method with the 'charge' object */}
          Meteor.call('processPayment', charge, (error, response) => {
            if (error) {
              SELF.setState({ processing: false });
              Bert.alert(error.reason, 'danger');
            }
            Bert.alert('Thanks! You\'ll be ghost free soon :)', 'success');
            console.log(response);
            return response;
          });
        },
        closed() {
          SELF.setState({ processing: false });
        },
      });
    }


  openStripeCheckout(){
    INSTANCE.checkout.open({
      name: 'Breakthrough',
      description: "A one on one meeting and response",
      amount: 19999,
      bitcoin: false,
      email: this.state.userEmail
    });
  }

  render(){
    return(
      <div>
        <p>Signup Form</p>
        <a href="#" onClick={this.openStripeCheckout.bind(this)}>buy something big boy</a>
      </div>
    )
  }
}
