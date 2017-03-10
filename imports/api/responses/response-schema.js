import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Declare Mongo collection for Client Video Responses
export const Responses = new Mongo.Collection('responses');

// Deny client-side updates of Response outside of Methods.
Responses.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

const ResponseSchema = {};

ResponseSchema.Response = new SimpleSchema({
  _id: {
    type:String,
    denyUpdate: true,
    regEx: SimpleSchema.RegEx.Id,
    label: "The ID of the video db object"
  },
  createdAt: {
    type: Date,
    label: "Day the response was created",
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
    index: true,
    unique: true,
    label: "The ID of the Client's User object"
  },
  responseType:{
    type: String,
    allowedValues: ['Breakthrough', 'Paradigm Shift'],
    optional:true
  },
  personalMessage: {
    type: String,
    label: "Personal Message to the client to go with Recap video",
    optional: true,
    max: 2000
  },
  recapVideoId: {
    type:String,
    regEx: SimpleSchema.RegEx.Id,
    label: "The Id of the Client's Recap video object",
    optional: true
  },
  additionalResponseVideoIds: {
    type: Array,
    optional: true
  },
  "additionalResponseVideoIds.$":{
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: "The id of the additional response videos"
  },
  additionalResources:{
    type: [Object],
    optional: true
  },
  "additionalResources.$.resourceTitle":{
    type: String,
    label: "Title of the additional resource, link, video",
    optional: true,
    max: 500
  },
  "additionalResources.$.resourceDescription":{
    type: String,
    label: "Description of the additional resource",
    optional: true,
    max: 2000
  },
  "additionalResources.$.resourceUrl":{
    type: String,
    regEx: SimpleSchema.RegEx.Url
  },
  responseComplete: {
    type: Boolean
  }


})

Responses.attachSchema(ResponseSchema.Response);
