import React from 'react';
import { IndexLink, Link } from 'react-router';
import { isAdmin } from '../../api/security/security.js';

export const Navigation = () => {
  if(isAdmin(this.userId)){
    return(

       <div>
         <span><IndexLink to="/" activeClassName="active">Index </IndexLink></span>
         <span><Link to="/terms" activeClassName="active">Terms </Link></span>
         <span><Link to="/privacy" activeClassName="active">Privacy </Link></span>
         <span><Link to="/disclaimer" activeClassName="active">disclaimer </Link></span>
         <span><Link to="/admin/clients" activeClassName="active">Clients </Link></span>
       </div>
   )
  }
  else {
    return;
  }

}
