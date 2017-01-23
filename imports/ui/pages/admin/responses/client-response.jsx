import React from 'react';

export default class AdminClientResponse extends React.Component {

    render(){
      return(
        <div className='container'>Individual Response for {this.props.params.id}</div>
      )
    }

}
