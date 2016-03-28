import {Link} from 'react-router';
import React from 'react';

export const TabBar = class TabBar extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return <div className="tabBar">
      <div className="signUp tab">
        <Link to="/signUp">Sign Up</Link>
      </div>

      <div className="signIn tab">
        <Link to="/signIn">Sign In</Link>
      </div>
    </div>
  }
}

