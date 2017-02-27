
Accounts.onCreateUser(function(options, user) {
    user.hasPaid = false;
    user.appointmentStatus = 'Not Scheduled';
    user.responseStatus = 'Response Not Started';
    
    // Create an empty response for this user
    Meteor.call('response.createResponseDoc', user._id, function(err,res){
      if(err) console.log(err);
      console.log(res);
    })
    return user;
});
