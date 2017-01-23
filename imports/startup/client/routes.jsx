import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Components & Wrappers

import { App } from '../../ui/layouts/app.jsx';
import { Index } from '../../ui/components/index.jsx';


// Admin Pages & Components
import AdminStart from '../../ui/pages/admin/admin-start.jsx';
import AdminResponseIndex from '../../ui/pages/admin/responses/index.jsx';
import AdminClientResponse from '../../ui/pages/admin/responses/client-response.jsx';


// Pages
import PageOne from '../../ui/pages/one.jsx';
import { PageTwo } from '../../ui/pages/two.jsx';
import { Hello } from '../../ui/pages/hello.jsx';
import { NotFound } from '../../ui/pages/not-found.jsx';


const requireAuth = () => {
  let currentUser = Meteor.user();
  if(currentUser){
    console.log('user-logged-in');
  } else {
    console.log('log-in-required');
  }
}

const requireAdmin = () => {
  console.log('admin-role-required');
}

Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
      <Route path='/' component={ App }>
        <IndexRoute component={ Index } />
        <Route path='/one' component={ PageOne }/>
        <Route path='/two' component={ PageTwo }/>
        <Route path='/hello/:name' component={ Hello } onEnter={ requireAuth } />

        {/* Admin Routes */}
        <Route path='admin' component={ AdminStart } />
        <Route path='/admin/responses' component={ AdminResponseIndex } />
        <Route path='/admin/responses/:id' component={ AdminClientResponse } />

        {/* Not Found */}
        <Route path='*' component={ NotFound }/>
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
