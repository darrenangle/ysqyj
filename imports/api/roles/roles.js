import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

const adminRole = Meteor.settings.private.adminSettings.role;

Meteor.methods({
  'roles.isAnAdminAccount'(clientId){
    check(clientId,String);
    if (!this.userId){
      console.log('ID CHECK FAILED ON USER: ' + clientId +", "+ this.userId);
      throw new Meteor.Error(403, "Access denied");
    }
    //If client id doesn't match serverside id
    // possible man in the middle attack, deny
    if (clientId && clientId !== this.userId) {
      console.log('ID OF CLIENT DOESNT MATCH SERVER: ' + clientId +", "+ this.userId);

      throw new Meteor.Error(403, "Access denied");
    }
    if ( !Roles.userIsInRole(this.userId, adminRole) ){
        throw new Meteor.Error(403, "Access denied");
    } else {
      console.log("ADMIN LOGGED IN. ID: " + this.userId)
      return "this-is-allowed";
    }
  }
})
