import React, { Component } from 'react';
import SubmitButton from '../common/submitButton';
import Text from '../common/text';
import PasswordText from '../common/passwordText';
import {withRouter} from 'react-router-dom';
//import GoogleLogin from 'react-google-login';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//import {setCookie} from '../intro/cookie';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      autoLogin:false,
    }
  }

   changeValue = (event) => {
    const objName = event.target.id;
    if(objName === 'email')
        this.setState({email: event.target.value});
    else if(objName === 'password')
        this.setState({password: event.target.value});
    else 
        this.setState({autoLogin:!this.state.autoLogin});
  }

 ClickHandler = (event) => {
  this.props.action(this.state.email,this.state.password, this.state.autoLogin);
  this.props.history.push('/note');
 }
  handleChecked = () => {
    this.setState = ({
      autoLogin : !this.state.autoLogin
    });
  }

  render() {

    // const responseGoogle = (response) => {
    //   console.log(response);
    // }

    return (
      <div className="page" 
      tabIndex="-1"
      onKeyDown={(e) => {
          if(e.key === 'Enter') {
              this.ClickHandler();
          }
      }}>
        <label className="title" htmlFor="login">Login</label>
        <Text text="Email" id='email' onChange={event => this.changeValue(event)}/>
        <PasswordText text="Password" id='password' value={this.state.password} onChange={event => this.changeValue(event)}/>
        <FormControlLabel
        control={
          <Checkbox checked={this.state.autoLogin} onChange={event => this.changeValue(event)} id='autoLogin' color="primary"/>
        }
        label="자동 로그인"
        />
        <SubmitButton text = "Sign In" onClick={this.ClickHandler} />

        {/* <GoogleLogin
          clientId="500112564024-f0o36gqgeejsauthuk0mijoa5vsqea5e.apps.googleusercontent.com"
          scope="https://www.googleapis.com/auth/analytics"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          onRequest={responseGoogle}
          offline={false}
          approvalPrompt="force"
          responseType="id_token"
          isSignedIn
          theme="dark"
        /> */}
      </div>
    );
  }
}

export default withRouter(Login);