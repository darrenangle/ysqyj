const adminId = Meteor.settings.private.adminSettings.id;
const adminRole = Meteor.settings.private.adminSettings.role;

export const configureRoles = () => {
  if( !Roles.userIsInRole(adminId, adminRole) ){
    Roles.addUsersToRoles(adminId, adminRole)
  }
}
