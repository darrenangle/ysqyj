const adminId = Meteor.settings.private.adminSettings.id;
const adminRole = Meteor.settings.public.adminRole;

export const configureRoles = () => {
  if( !Roles.userIsInRole(adminId, adminRole) ){
    Roles.addUsersToRoles(adminId, adminRole)
  }
}
