import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Questions = new Mongo.Collection('questions');

Questions.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
})

const QuestionsSchema = {};

QuestionSchema.Question = new SimpleSchema({
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
  questionText: {
    type: String,
    label: "the text of the question",
    max: 2000
  },
  tags:{
    type: [Object]
  },
  "tags.$.tagText":{
    type: String,
    max: 200,
    optiona: true
  }
    
});
