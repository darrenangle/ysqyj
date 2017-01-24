import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const UserSchema = {};

UserSchema.UserCountry = new SimpleSchema({
    name: {
        type: String
    },
    code: {
        type: String,
        regEx: /^[A-Z]{2}$/
    }
});

UserSchema.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        optional: true
    },
    lastName: {
        type: String,
        optional: true
    },
    organization : {
        type: String,
        optional: true
    },
    website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    country: {
        type: UserSchema.UserCountry,
        optional: true
    }
});


UserSchema.User = new SimpleSchema({
    // Business Logic Schema
    name: {
      type: String,
      max: 200,
      denyUpdate: true
    },
    hasPaid: {
      type: Boolean
    },
    appointmentStatus: {
      type: String,
      allowedValues: ['Not Scheduled', 'Scheduled', 'Complete']
    },
    appointmentId: {
      type:String,
      regEx: SimpleSchema.RegEx.Id,
      optional: true
    },
    responseStatus: {
      type: String,
      allowedValues: ['Response Not Recieved', 'Response In Progress', 'Response Recieved']
    },
    agreedToTerms: {
      type: Boolean,
      allowedValues: [true]
    },
    over18: {
      type: Boolean,
      allowedValues: [true]
    },

    emails: {
        type: Array,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: UserSchema.UserProfile,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
        // Option 1: Object type
        // If you specify that type as Object, you must also specify the
        // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
        // Example:
        // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
        // You can't mix and match adding with and without a group since
        // you will fail validation in some cases.
        roles: {
            type: Object,
            optional: true,
            blackbox: true
        },
    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
        type: Date,
        optional: true
    }
});

Meteor.users.attachSchema(UserSchema.User);
