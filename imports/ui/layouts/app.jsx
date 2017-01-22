import React from 'react';
import { Navigation } from '../components/nav.jsx';

export const App = ( { children } ) => (
  <div>
    <Navigation />

    {/*
      // children obj passed here allows for router to share current routes components
      // pattern explained here : https://themeteorchef.com/tutorials/react-router-basics
    */}

    { children }

  </div>
)
