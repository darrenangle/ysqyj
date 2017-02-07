import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Declare Mongo collection
export const ResponseVideos = new Mongo.Collection('responseVideos');

// Deny client-side updates of survey outside of methods.
ResponseVideos.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

const ResponseVideoSchema = {};

ResponseVideoSchema.ResponseVideo = new SimpleSchema({
  _id: {
    type:String,
    denyUpdate: true,
    regEx: SimpleSchema.RegEx.Id,
    label: "The ID of the video db object"
  },
  createdAt: {
    type: Date,
    label: "Day the response video was uploaded",
    denyUpdate: true
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
  owner: {
    type:String,
    denyUpdate: true,
    regEx: SimpleSchema.RegEx.Id,
    label: "The ID of the User this video is for"
  },
  responseId: {
    type:String,
    denyUpdate: true,
    regEx: SimpleSchema.RegEx.Id,
    label: "The Response db object this video is attached to"
  },
  isRecapVideo:{
    type: Boolean,
    label: "Is this the response's Recap Video?"
  },
  responseRank: {
    type: Number,
    label: "Where in the list of videos should this video appear?",
    min: 0,
    optional: true
  },
  videoTitle: {
    type: String,
    label: "Title of The Video",
    max: 200,
    optional: true
  },
  videoDescription: {
    type: String,
    label: "Brief summary",
    optional: true,
    max: 1000
  },
  fileURLs: {
    type: [Object],
    minCount: 1,
    maxCount: 6
  },
  "fileURLs.$.fileType":{
    type: String,
    max:10,
    optional:true
  },
  "fileURLs.$.quality":{
    type: String,
    max:10,
    optional:true
  },
  "fileURLs.$.url":{
    type: String,
    regEx: SimpleSchema.RegEx.Url
  },
  hasTranscript:{
    type: Boolean,
    label: "Does this video have a transcript?"
  },
  audioFileURL:{
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    label: "The URL for the audio of this vid",
    optional: true
  },
  transcriptText: {
    type:String,
    max: 5000,
    optional:true,
    label: "Text Transcript of the Video"
  },
  transcriptFileURL:{
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true,
    label: "File URL of the video transcript PDF / doc"
  }
});

ResponseVideos.attachSchema(ResponseVideoSchema.ResponseVideo);
