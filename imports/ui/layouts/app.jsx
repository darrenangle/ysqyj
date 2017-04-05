import React from 'react';


export const App = ( { children } ) => (

  <div>


    {/*
      // children obj passed here allows for router to share current routes components
      // pattern explained here : https://themeteorchef.com/tutorials/react-router-basics
    */}

    { children }

  </div>
  
)
