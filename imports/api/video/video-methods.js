import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { isAdmin } from '../security/security.js';
import { ResponseVideos } from './response-video-schema.js'
import { Responses } from '../responses/response-schema.js';

Meteor.methods({
  'videos.getVideoURLbyID'(videoId){
    if(!isAdmin(this.userId)){
      console.log('You aren\'t supposed to do that!')
    } else {
      let response = ResponseVideos.find({_id: videoId}, { fields: { fileURLs: 1 } }).fetch();
      return response[0].fileURLs[0].url;
    }
  },
  'videos.uploadNewRecapVideo'(doc){
    // check if requester is admin
    check(doc.url, String);
    if(!isAdmin(this.userId)){
      console.log('You aren\'t supposed to do that!')
    } else {

      let video = {
        fileType: "default",
        quality: "default",
        url: doc.url
      }
      let responseVideoDoc = {
        owner: doc.client,
        responseId: doc.response,
        isRecapVideo: true,
        fileURLs: [ video ],
        hasTranscript: false,
        createdAt: new Date()
      }

      // Create new video doc with URL
      ResponseVideos.insert(responseVideoDoc, function(error, newId){
        if(error){ console.log(error )} else {
          // Add video ID to response doc
          Responses.update({_id: doc.response}, { $set: { recapVideoId: newId} }, function(error){
            if (error) console.log(error)
          })
        }

      }) //End ResponseVideos insert
    } // end isAdmin check
  }
})
