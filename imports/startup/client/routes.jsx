import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Components & Wrappers

import { App } from '../../ui/layouts/app.jsx';
import { Index } from '../../ui/components/index.jsx';

// Pages

import { PageOne } from '../../ui/pages/one.jsx';
import { PageTwo } from '../../ui/pages/two.jsx';

Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
      <Route path='/' component={ App }>
        <IndexRoute component={ Index } />
        <Route path='/one' component={ PageOne }/>
        <Route path='/two' component={ PageTwo }/>
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
