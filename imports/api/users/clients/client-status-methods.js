import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { isAdmin } from '../../security/security.js'


Meteor.methods({
  'client.setResponseStatus'(clientId, newResponseStatus){
    check(newResponseStatus, String);

    if(isAdmin(this.userId)){
      Meteor.users.update(clientId, { $set: { responseStatus: newResponseStatus } });
    } else {
      console.log('You aren\'t supposed to do that!')
    }
  },
  'client.setAppointmentStatus'(clientId, newAppointmentStatus){
    check(newAppointmentStatus, String);

    if(isAdmin(this.userId)){
      Meteor.users.update(clientId, { $set: { appointmentStatus: newAppointmentStatus } });
    } else {
      console.log('You aren\'t supposed to do that!')
    }
  },

});
