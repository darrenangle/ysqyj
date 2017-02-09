import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { isAdmin } from '../security/security.js';
import { ResponseVideos } from './response-video-schema.js'; 

if (Meteor.isServer){

  Meteor.publish('videosByOwner', function responseVideoPublication(ownerId){
    if(!isAdmin(this.userId)){
      throw new Meteor.Error(403, "Access denied")
    }
    return ResponseVideos.find({ owner: ownerId})
  })


}
