import { Meteor } from 'meteor/meteor';
import  cloudfront from 'aws-cloudfront-sign';
import { moment } from 'meteor/momentjs:moment';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check'

const privatekeystring = Meteor.settings.private.AWS.cloudfrontPrivateKey;
const keypairId = Meteor.settings.private.AWS.cloudfrontKeyPairId;

Meteor.methods({
  'getResponseVideoUrls'(urls, ownerId){
      if (!this.userId) {
        throw new Meteor.error('403', 'You are not authorized to access this content');
      }
      if(ownerId == this.userId || isAdmin(this.userId)){
        let options = {
          keypairId: keypairId,
          privateKeyString: privatekeystring,
          expireTime: moment().add(4, 'hours')
        } 
        let signedUrls = {};
        signedUrls.url = urls.cdnUrl ? cloudfront.getSignedUrl(urls.cdnUrl, options) : "";
        signedUrls.audioFileURL = urls.audioFileURL ? cloudfront.getSignedUrl(urls.audioFileURL, options) : "";
        signedUrls.posterUrl = urls.posterUrl ? cloudfront.getSignedUrl(urls.posterUrl, options) : "";
        return signedUrls;
      }
  },
  'getSignedUrl.clientResponseVideo'(url, ownerId){
    // Check Signed in
    if (!this.userId) {
      throw new Meteor.error('403', 'You are not authorized to access this content');
    }

    // Check URL and ID Schema
    new SimpleSchema({
      url: {
        type:String,
        regEx: SimpleSchema.RegEx.Url
      },
      ownerId: {
        type:String,
        regEx: SimpleSchema.RegEx.Id
      }
    }).validate({url, ownerId});

    if(ownerId == this.userId || isAdmin(this.userId)){
      let options = {
        keypairId: keypairId,
        privateKeyString: privatekeystring,
        expireTime: moment().add(4, 'hours')
      }
      return cloudfront.getSignedUrl(url, options)
    }

  }
})
