import React from 'react';

export default class clientStatusList extends React.Component {
  render(){
    return(

    )
  }
}

clientStatusList.propTypes = {
  clients: PropTypes.array.isRequired,
  clientCount: PropTypes.number.isRequired,
}


export default createContainer( () => {
  Meteor.subscribe('userList');
  return {
    clients: Meteor.users.find({}, { sort: {createdAt: -1} }).fetch();
    clientCount: Meteor.users.find().count() -1;
  }

}, clientStatusList);
