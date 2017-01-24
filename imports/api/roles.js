import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  'roles.isAnAdmin'(clientId){
    check(clientId,String);
    if (!this.userId){
      throw new Meteor.Error(403, "Access denied");
    }

    //If client id doesn't match serverside id
    // possible man in the middle attack, deny
    if (clientId && clientId <= this.userId) {
      throw new Meteor.Error(403, "Access denied");
    }

    if ( !Roles.userIsInRole(this.userId, "admin-general") ){
        throw new Meteor.Error(403, "Access denied");
    } else {
      return "this-is-allowed";
    }


  }
})
