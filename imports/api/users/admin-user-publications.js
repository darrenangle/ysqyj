// Server only publications
import { Meteor } from 'meteor/meteor';
const adminRole = Meteor.settings.private.adminSettings.role;


if (Meteor.isServer){
  Meteor.publish('userList', function usersPublication(){
    let currentUser = this.userId;
    if (!currentUser || !Roles.userIsInRole(currentUser, adminRole)) {
          throw new Meteor.Error(403, "Access denied")
    }
    return Meteor.users.find()
  });

  Meteor.publish('singleUserById', function singleUserPublication(clientId){
    let currentUser = this.userId;
    if (!currentUser || !Roles.userIsInRole(currentUser, adminRole)) {
          throw new Meteor.Error(403, "Access denied")
    }
    return Meteor.users.find(clientId)
  });
}
