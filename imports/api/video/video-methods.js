import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { isAdmin } from '../security/security.js';
import { ResponseVideos } from './response-video-schema.js'
import { Responses } from '../responses/response-schema.js';

Meteor.methods({
  'videos.deleteRecapVideo'(videoId,responseId){
    if(!isAdmin(this.userId)){
      throw new Meteor.Error(403, "Access denied")
    } else {
        return {
          delete: ResponseVideos.deleteOne({_id: videoId}),
          update: Responses.update({_id: responseId}, {$set: { recapVideoId: "" } })
        }
    }
  },

  'videos.uploadResponseVideo'(doc){
    // check if requester is admin
    if(!isAdmin(this.userId)){
      throw new Meteor.Error(403, "Access denied")
    } else {
      // Create new video doc with URL
      ResponseVideos.insert(doc, function(error, newId){
        if(error){ console.log(error )} else {
          // Add video ID to response doc if recap video
          if (doc.isRecapVideo){
            Responses.update({_id: doc.responseId}, { $set: { recapVideoId: newId} }, function(error){
              if (error) console.log(error)
            })
          }
      }
      }) //End ResponseVideos insert
    } // end isAdmin check
  }
})
