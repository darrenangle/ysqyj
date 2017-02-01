import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { isAdmin, isOwner } from '../security/security.js';
import { Responses } from './response-schema.js';

Meteor.methods({
  'response.responseExists'(clientId){
    if(isAdmin(this.userId)){
      let response = Responses.find({owner:clientId}).count();
      if (response > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return 'not-authorized'
    }
  },
  'response.createResponseDoc'(clientId){
    // Verify current user is Admin
    if(isAdmin(this.userId)){
      Responses.insert({
        owner: clientId,
        createdAt: new Date()
      })
    } else {
      return 'not-authorized'
    }

  }
})
