
Accounts.onCreateUser(function(options, user) {
    user.hasPaid = false;
    user.appointmentStatus = 'Not Scheduled';
    user.responseStatus = 'Response Not Received';
    return user;
});
