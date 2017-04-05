import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const CoachingApplications = new Mongo.Collection('coachingApplications');

CoachingApplications.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

const CoachingApplicationSchema = {};

CoachingApplicationSchema.CoachingApplication = new SimpleSchema({
  _id: {
    type:String,
    denyUpdate: true,
    regEx: SimpleSchema.RegEx.Id,
    label: "The ID of the application db object"
  },
  createdAt: {
    type: Date,
    label: "Day the application was created",
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
  firstName: {
    type: String,
    max:300
  },
  lastName: {
    type: String,
    max:300
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    max:500
  },
  helpWithTheseIssues: {
    type: [String],
    minCount: 1,
    maxCount: 7
  },
  "helpWithTheseIssues.$":{
    type: String,
    allowedValues: [
      'choosing-next-career',
      'quit-current-job',
      'change-careers',
      'side-business',
      'raise-or-promotion',
      'more-time',
      'paid-for-fun'
    ]
  },
  answer10KQuestion: {
    type: String,
    max: 10000
  },
  answerIdealCareerQuestion: {
    type: String,
    max: 10000
  },
  answerObstaclesQuestion: {
    type: String,
    max: 10000
  },
  answerOutsiderPerspectiveQuestion: {
    type: String,
    max: 10000
  },
  answerBiggestIssueQuestion: {
    type: String,
    max: 10000
  }
})
