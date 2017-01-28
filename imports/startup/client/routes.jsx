import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Components & Wrappers

import { App } from '../../ui/layouts/app.jsx';
import { Index } from '../../ui/components/index.jsx';
import QuickLogin from '../../ui/pages/login.jsx';

// Admin Pages & Components
import AdminStart from '../../ui/pages/admin/admin-start.jsx';
import AdminResponseIndex from '../../ui/pages/admin/responses/index.jsx';
import AdminClientResponse from '../../ui/pages/admin/responses/client-response.jsx';
import ClientStatusList from '../../ui/pages/admin/clients/client-status-list.jsx';

// Legal Pages
import DisclaimerWrapper from '../../ui/pages/legal/disclaimer-wrapper.jsx';
import TermsWrapper from '../../ui/pages/legal/terms-wrapper.jsx';
import Privacy from '../../ui/pages/legal/privacy.jsx';


// Pages to delete
import PageOne from '../../ui/pages/one.jsx';
import { PageTwo } from '../../ui/pages/two.jsx';
import { Hello } from '../../ui/pages/hello.jsx';
import { NotFound } from '../../ui/pages/not-found.jsx';

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
        <IndexRoute component={ Index } />
        <Route path='/login' component={QuickLogin} />

        {/* Learning Routes TO BE DELETED*/}
        <Route path='/one' component={ PageOne }/>
        <Route path='/two' component={ PageTwo }/>
        <Route path='/hello/:name' component={ Hello } onEnter={ requireAuth } />

        {/* Admin Routes */}
        <Route path='admin' component={ AdminStart } onEnter={ requireAdmin }/>
        <Route path='/admin/responses' component={ AdminResponseIndex } onEnter={ requireAdmin }/>
        <Route path='/admin/responses/:id' component={ AdminClientResponse } onEnter={ requireAdmin }/>
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
