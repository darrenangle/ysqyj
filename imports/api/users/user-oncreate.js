
Accounts.onCreateUser(function(options, user) {
    user.hasPaid = false;
    user.appointmentStatus = 'Not Scheduled';
    user.responseStatus = 'Response Not Started';
    
    return user;
});
