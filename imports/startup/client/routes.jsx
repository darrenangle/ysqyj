import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';


// Components & Wrappers

import { App } from '../../ui/layouts/app.jsx';
import HomePageLanding from '../../ui/pages/landing/homepage-wrapper.jsx';
import LandingPage from '../../ui/pages/landing/landing-v1.jsx';
import { NotFound } from '../../ui/pages/not-found.jsx';

// User Account MGMT Routes
import QuickLogin from '../../ui/pages/login.jsx';
import GetStarted from '../../ui/pages/onboarding/get-started.jsx';
import ClientResponse  from '../../ui/pages/client-response/client-response-wrapper.jsx';

// Admin Pages & Components
import AdminStart from '../../ui/pages/admin/admin-start.jsx';
import ClientStatusList from '../../ui/pages/admin/clients/client-status-list.jsx';
import AdminClientResponse from '../../ui/pages/admin/responses/admin-client-response-wrapper.jsx';

// Legal Pages
import DisclaimerWrapper from '../../ui/pages/legal/disclaimer-wrapper.jsx';
import TermsWrapper from '../../ui/pages/legal/terms-wrapper.jsx';
import Privacy from '../../ui/pages/legal/privacy.jsx';


// Route onEnter functions
import { requireAdmin } from './route-security.js'

const requireAuth = () => {
  let currentUser = Meteor.user();
  if(currentUser){
    console.log('user-logged-in');
  } else {
    console.log('log-in-required');
  }
}

// const requireAdmin = () => {
//   console.log('admin-role-required');
// }

Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
      <Route path='/' component={ App }>
        <IndexRoute component={ HomePageLanding } />
        <Route path='/landing-v1' component={LandingPage} onEnter={ requireAdmin }/>



        {/* User Routes*/}
        <Route path='/login' component={QuickLogin} />
        <Route path='/get-started' component={GetStarted} />
        <Route path='/my-response' component={ ClientResponse } />
        {/*<Route path='/responses/:id' component={ AdminClientResponse } onEnter={ requireOwner }/> */}


        {/* Admin Routes */}
        <Route path='admin' component={ AdminStart } onEnter={ requireAdmin }/>
        <Route name='clientResponse' path='/admin/responses/:id' component={ AdminClientResponse } onEnter={ requireAdmin }/>
        <Route path='/admin/clients' component={ ClientStatusList } onEnter={ requireAdmin }/>

        {/* Legal & Terms */}
        <Route path='/disclaimer' component={ DisclaimerWrapper }/>
        <Route path='/terms' component={ TermsWrapper }/>
        <Route path='/privacy' component={ Privacy }/>


        {/* Not Found */}
        <Route path='*' component={ NotFound }/>
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
