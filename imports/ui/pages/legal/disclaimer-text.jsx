import React, { Component, PropTypes } from 'react';

export default class DisclaimerText extends Component {
  render(){
    return(
      <div className='disclaimer-text-wrapper'>
        <h3>Summary</h3>
        <ul>
          <li>Any data you provide to YSQYJ through this website or any YSQYJ service will be stored securely and will never be sold.</li>
          <li>YSQYJ will never store any credit card information.</li>
          <li>All of your decisions are your own.</li>
          <li>YSQYJ and its employees are not responsible for how you use our content, products, or services.</li>
          <li>No one that works for YSQYJ is licensed or certified in any medical, legal, or professional capacity.</li>
          <li>The content featured on this site does is not legal, medical, or professional advice.</li>
        </ul>
      </div>

    )
  }
}
