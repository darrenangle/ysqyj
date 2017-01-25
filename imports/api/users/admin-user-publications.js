// Server only publications
import { Meteor } from 'meteor/meteor';
const adminRole = Meteor.settings.private.adminSettings.role;


if (Meteor.isServer){
  Meteor.publish('userList', function tasksPublication(){
    let currentUser = this.userId;
    if (!currentUser || !Roles.userIsInRole(currentUser, adminRole)) {
          throw new Meteor.Error(403, "Access denied")
    }
    return Meteor.users.find()
  });
}
