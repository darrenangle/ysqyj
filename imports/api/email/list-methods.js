import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';
import { ValidEmail, IsValidEmail} from 'meteor/froatsnook:valid-email';


const mailchimpAPIkey = Meteor.settings.private.MailChimp.apiKey;


Meteor.methods({
  'addEmailtoGeneralList'(emailaddress){

    if(IsValidEmail(emailaddress)){

      return "valid-email"

    } else {
      throw new Meteor.Error(403, "Invalid Email Address")
    }

  }
})
