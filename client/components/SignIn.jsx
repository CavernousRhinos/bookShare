import React from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {TabBar} from './TabBar';
import NavBar from './NavBar';
import Preloader from './Preloader';

export const SignIn = class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }
  changeUsername(username){
    this.setState({
      username: username
    })
    this.props.setEmail(username);
  }
  changePassword(password){
    this.setState({
      password: password
    });
    this.props.setPassword(password);
  }
  render() {
    return <div className="signin">
    <TabBar></TabBar>
    <form>
      <div>
        <label htmlFor="user">Username</label>
        <input onChange={(event) => this.changeUsername(event.target.value)} type="text" name="user" id="user" placeholder="Enter a username or email"/>
        { this.props.usernameValidationMessage ? <label className="message error">Please enter a username</label> : null }
      </div>

      <div>
        <label htmlFor="signInPassword">Password</label>
        <input onChange={(event)=>this.changePassword(event.target.value)} type="password" id="signInPassword" placeholder="Enter your password"/>
        { this.props.passwordValidationMessage ? <label className="message error">Please enter a password</label> : null }
      </div>

      <div className="submitBtn">
        <input onClick={(event) =>{event.preventDefault();this.props.regularSignIn(this.state.username, this.state.password)} }type="submit" value="Log in"/>
      </div>

      {/*<div className="submitBtn">
        <a href="login/facebook">Login with facebook</a>
      </div>*/}
    </form>
  </div>;
  }
}
function mapStateToProps(state){
  return {
    usernameValidationMessage: state.auth.getIn(['displayValidationMessage', 'signIn', 'username']),
    passwordValidationMessage: state.auth.getIn(['displayValidationMessage', 'signIn', 'password'])
  }
}

export const SignInContainer = connect(
  mapStateToProps,
  actionCreators
)(SignIn);

export default SignIn;
