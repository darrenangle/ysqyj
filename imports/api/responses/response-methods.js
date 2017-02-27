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
      return 'response exists: not-authorized'
    }
  },
  'response.createResponseDoc'(clientId){
    // Verify current user is Admin
    if(isAdmin(this.userId)){
      return Responses.insert({
        owner: clientId,
        createdAt: new Date(),
        responseComplete: false
      })
    } else {
      return 'create response not-authorized'
    }
  },
  'response.updatePersonalMessage'(responseId,newPersonalMessage){
    if(isAdmin(this.userId)){

      Responses.update({ _id: responseId }, { $set: { personalMessage: newPersonalMessage } }, function(err, docNum){
        if(!err){
          return 'updated!'
        }
      });

    } else {
      return 'not-authorized'
    }
  },
  'response.toggleReady'(responseId,readyState){
    if(isAdmin(this.userId)){

      Responses.update({ _id: responseId }, { $set: { responseComplete: readyState } }, function(err, docNum){
        if(!err){
          return 'updated!'
        }
      });

    } else {
      return 'not-authorized'
    }

  }
})
