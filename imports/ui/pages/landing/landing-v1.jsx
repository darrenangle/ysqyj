import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import Navbar from '../../components/nav/nav.jsx';
import Header from './components/header.jsx';
import './landing-v1.scss';

export default class LandingPage extends Component {
  render(){
    return(
    <div>
    	<Navbar/>
    	<div className='landing-page-wrapper container'>

			<div className='headline-copy-block'>
				<h3 className='copy-headline'>the confidence you need<br/>to take the first step</h3>
				<p>I'll teach you the right mindset to never feel bored at work again.</p>
				<p>You'll learn to get paid to pursue your interests. Even if they're not 'in your job description'!</p>
				:
					<br/>
					<i>Can I really get paid for </i>
			</div>

			<div className='headline-copy-block'>
				<h3 className='copy-headline'>you don't just need a <i>good</i> job<br/>you need the <i>right</i> job for you</h3>
				<p>I used to think that a <i>good job</i> meant any job that can pay the bills, let me write poems, and keep me from dying.</p>
				<p>I went out and got a so-called <i>good job</i>. Can you guess what happened? It sucked! I wasn't myself at work, and I was handing over <i>a ton of my time</i> for just a $10 an hour. I couldn't afford to go on a date to McDonalds! </p>
				<div className='copy-line-divider'></div>			
				<p>Then, I somehow decided a <i>good job</i> meant making $50,000. Why? Who cares! It seemed like a good number. So, what happened?</p>
				<p>A friend hooked me up with a job at 50K, but I went in blind.
				<br/>I didn't do any research. 
				<br/>I didn't care if the job engaged any of my real interests.
				<br/>(Who would pay for those?)</p>
				<p>The workplace culture was toxic. Everyone seemed to swing from angry to totally checked out. My boss wouldn't let me grow, even though I was working harder than anyone. (At least I could afford therapy!)</p>
				
			</div>

			<div className='headline-copy-block'>
				<h3 className='copy-headline'>make more money<br/>using more of your gifts</h3>
				<p>There are a lot of ways to make 6-figures.</p>
				<p>In fact, if all you want is a high salary, I'd be happy to show you your fastest path to wealth in a one-on-one session and call it a day. </p>
				<p>But work isn't just about money.</p>
				<p>Work is about getting paid on <i>your</i> terms doing what <i>you</i> find most engaging.</p>
				<p>
					Maybe you're asking yourself:
					<br/>
					<i>Can I really get paid for </i>

				</p>

			</div>


      	</div>
    </div>

    )
  }
}
