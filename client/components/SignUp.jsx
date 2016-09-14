import {Link} from 'react-router';
import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/authActions';
import {TabBar} from './TabBar';

export const SignUp = class SignUp extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return <div className="signup">
    <TabBar></TabBar>
    <form>
      <div>
        <label htmlFor="username">Username</label>
        <input onChange={(event) => this.props.setUsername(event.target.value)} type='text' id='username' name='username' placeholder="Type an username"/>
        { this.props.usernameValidationMessage ? <label className="message error">Please enter a username</label> : null }
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input onChange={(event) => this.props.setEmail(event.target.value)} type='text' id="email" name="email" placeholder="Type an email"/>
        { this.props.emailValidationMessage ?<label className="message error">Please enter an email</label> : null }
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input onChange={(event)=>this.props.setPassword(event.target.value)} type='password' id="password" name='password' placeholder="Type your password"/>
        { this.props.passwordValidationMessage ?<label className="message error">Please enter a password</label> : null }
      </div>

      <div className="retype">
        <label htmlFor="retypePassword"></label>
        <input onChange={(event)=>this.props.setPasswordConfirmation(event.target.value)}type='password' id="retypePassword" name='retypePassword' placeholder="Retype your password"/>
        { this.props.passwordConfirmationValidationMessage ?<label className="message error">Please enter a password confirmation</label> : null }
      </div>

      <div className="submitBtn">
        <input onClick={(event)=>{
          event.preventDefault();this.props.regularSignUp({
            username: this.props.username,
            email: this.props.email,
            password: this.props.password,
            passwordConfirmation: this.props.passwordConfirmation
          });}
        } type='submit' value="Sign Up"/>
      </div>
    </form>
  </div>;
  }
}

function mapStateToProps(state){
  return {
    usernameValidationMessage: state.auth.getIn(['displayValidationMessage', 'signUp', 'username']),
    emailValidationMessage: state.auth.getIn(['displayValidationMessage', 'signUp', 'email']),
    passwordValidationMessage: state.auth.getIn(['displayValidationMessage', 'signUp', 'password']),
    passwordConfirmationValidationMessage: state.auth.getIn(['displayValidationMessage', 'signUp', 'passwordConfirmation']),
    username: state.auth.getIn(['userInfo', 'username']),
    email: state.auth.getIn(['userInfo','email']),
    password: state.auth.getIn(['userInfo','password']),
    passwordConfirmation: state.auth.getIn(['userInfo','passwordConfirmation'])
  }
}

export const SignUpContainer = connect(
  mapStateToProps,
  actionCreators
)(SignUp);
