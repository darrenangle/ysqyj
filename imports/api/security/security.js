import { Meteor } from 'meteor/meteor';
const adminRole = "swolesneakmage";

export const isAdmin = (userId) => {
  if (!userId || !Roles.userIsInRole(userId, adminRole)) {
    return false
  } else {
    return true
  }
}

export const isOwner = (userId, doc) => {
  if(doc.owner == userId) {
    return true;
  } else {
    return false;
  }
}
