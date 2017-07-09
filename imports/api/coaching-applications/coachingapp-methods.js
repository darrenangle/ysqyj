import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { isAdmin, isOwner } from '../security/security.js';
import { CoachingApplications, CoachingApplicationSchema } from './coachingapp-schema.js';

Meteor.methods({
  'submitCoachingApplication'(form){
    if(!form){
      throw new Meteor.Error( 500, 'There was an error processing your request' );
    }
    form.createdAt = new Date();
    check(form, CoachingApplicationSchema.CoachingApplication);
    CoachingApplications.insert(form);
  }
})
