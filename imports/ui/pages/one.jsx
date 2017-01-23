import React from 'react';

// short syntax
// export const PageOne = () => <div className='container'><h3>ONE</h3></div>;

// long syntax
export default class PageOne extends React.Component {
  render(){
    return (
      <div className='container'><h3>ONE</h3></div>
    )
  }
}
