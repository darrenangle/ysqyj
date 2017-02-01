import { Meteor } from 'meteor/meteor';
import { Responses } from './response-schema.js';
const adminRole = Meteor.settings.private.adminSettings.role;


if (Meteor.isServer){
  Meteor.publish('responseByClientId', function responsePublication(clientId){
    let currentUser = this.userId;
    if (!currentUser || !Roles.userIsInRole(currentUser, adminRole)) {
          throw new Meteor.Error(403, "Access denied")
    }
    return Responses.find({ owner: clientId})
  });
}
