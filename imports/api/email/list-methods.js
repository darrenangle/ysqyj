import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';
import { ValidEmail, IsValidEmail} from 'meteor/froatsnook:valid-email';
import  Mailchimp  from 'mailchimp-api-v3';

const mailchimpAPIkey = Meteor.settings.private.MailChimp.apiKey;
const mailchimp = new Mailchimp(mailchimpAPIkey);

Meteor.methods({
  'addEmailtoGeneralList'(emailaddress){

    if(IsValidEmail(emailaddress)){
      mailchimp.post(
        '/lists/addfd18be6/members',
        {
          email_address : emailaddress,
          status : 'subscribed'
        },
        function(results){
          console.log(results);
        }
      )

    } else {
      throw new Meteor.Error(403, "Invalid Email Address")
    }

  }
})
