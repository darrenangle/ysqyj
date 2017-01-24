import { Meteor } from 'meteor/meteor';
export const requireAdmin = (nextState, replace, callback) => {

  let currentUserId = Meteor.userId();
  if(!currentUserId){
    console.log("not-allowed");
    replace({ pathname: '/login' });
    callback();
  }

  Meteor.call('roles.isAnAdminAccount', currentUserId, function(error, result){
    if (error) console.log(error);
    if (result !== "this-is-allowed"){
      replace({ pathname: '/' })
    }
    callback();
  })
}
