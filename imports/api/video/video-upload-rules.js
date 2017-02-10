import 'meteor/edgee:slingshot'
import { isAdmin } from '../security/security.js'

const videoBucket = Meteor.settings.private.AWS.AWSClientVideoBucket;
const accessKeyId = Meteor.settings.private.AWS.AWSAccessKeyId;
const secretKey = Meteor.settings.private.AWS.AWSSecretAccessKey;
const region = Meteor.settings.private.AWS.AWSBucketRegion;


Slingshot.fileRestrictions("ResponseVideo",{
  allowedFileTypes: ["video/mp4", "video/quicktime"],
  maxSize: null
})

Slingshot.createDirective("ResponseVideo", Slingshot.S3Storage, {
  bucket: videoBucket,
  acl: "public-read",
  region: region,
  AWSAccessKeyId: accessKeyId,
  AWSSecretAccessKey: secretKey ,
  authorize: function(file, metaContext){
    // Deny upload if user isn't admin
    if(isAdmin(this.userId)){
      return true
    } else {
      throw new Meteor.Error("Not Allowed", "You are not allowed to do that bro.");
    }
  },
  key: function(file, metaContext){
    return "users/" + metaContext.clientId + "/response-videos/" + Date.now() + "-" + file.name;
  }
})
