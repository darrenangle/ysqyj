import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { isAdmin } from '../security/security.js';
import { ResponseVideos } from './response-video-schema.js';

if (Meteor.isServer){

  Meteor.publish('videosByOwner', function responseVideoPublication(ownerId){
    if(ownerId == this.userId || !isAdmin(this.userId)){
      return ResponseVideos.find({ owner: ownerId})
    } else {
        throw new Meteor.Error(403, "Access denied")
    }
  })


}
