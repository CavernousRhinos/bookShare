import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router'
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const SignIn = class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  changeUsername(username){
    this.props.setEmail(username);
  }
  changePassword(password){
    this.props.setPassword(password);
  }
  render() {
    return <div className="signin">
    <h1>Sign In Page</h1>
    <form>
      <table>
        <tr><td>User Name or Email</td></tr>
        <tr>
          <td>
            <input onChange={(event) => this.changeUsername(event.target.value)} type="text" name="username" placeholder="Please enter your username"/>
            <label className="message error">Plase enter an username</label>
          </td>
        </tr>
        <tr><td>Password</td></tr>
        <tr>
          <td>
            <input onChange={(event)=>this.changePassword(event.target.value)} type="password" placeholder="Please enter your password"/>
            <label className="message error">Plase enter a password</label>
          </td>
        </tr>
        <tr>
          <td>
            <input onClick={(event) =>{event.preventDefault();this.props.regularSignIn(this.state.username, this.state.password)} }type="submit" value="Log in"/>
          </td>
        </tr>
        <tr><td><a href="login/facebook">Login with facebook</a></td></tr>
        <Link to="/signUp">Sign Up</Link> 
      </table>
    </form>
  </div>;
  }  
} 
function mapStateToProps(state){
  return {}
}

export const SignInContainer = connect(
  mapStateToProps, 
  actionCreators
)(SignIn);

export default SignIn;
