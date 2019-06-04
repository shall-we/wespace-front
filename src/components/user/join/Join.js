import React, { Component } from 'react';
import '../common/page.css';
import SubmitButton from '../common/submitButton';
import Text from '../common/text';
import PasswordText from '../common/passwordText';
import Profile from './profile';
import './joinPage.css';
import {withRouter} from 'react-router-dom';

class Join extends Component {

  constructor(props){
    super(props);
    this.state={
      username : "",
      email : "",
      password : "",
        errors : {
          username : "",
          email : "",
          password : "",
        },
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    const { name, value } = event.target;
    let errors = this.state.errors;
    console.log('ㅅㅔ션',localStorage.test);
    const validEmailRegex= RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    
    // 영문, 숫자 혼합해서 6~10자리
    const validPasswordRegex=RegExp(/^.*(?=.{6,10})(?=.*[0-9])(?=.*[a-zA-Z]).*$/);
  
    switch (name) {
      case "username": 
        errors.username = 
          value.length < 1
            ? "Name is empty"
            : "";
        break;
      case "email": 
        errors.email = 
          validEmailRegex.test(value)
            ? ""
            : "Email is not valid!";
        break;
      case "password": 
        errors.password = 
        validPasswordRegex.test(value)
            ? ""
            : "Password is not valid!\n[6~10 digits including letters and number]";
        break;
      default:
        break;
    }
  
    this.setState({errors, [name]: value}, ()=> {
        console.log(errors);
    })
  }


  ClickHandler = () => {
    //select id, name from user where name NOT IN(select name from user, folder_list where user.id=folder_list.user_id and folder_list.id=###)
    const {username,email,password} =this.state;
    console.log(this.profile.getImgPath());
   this.props.action(username,email,password,this.profile.getImgPath());
   this.props.history.push('/');
 console.log('sjdksjdks',username,email,password);
 }
 
  render() {
    const {errors} =this.state;
    return (
    
      <div className="page"
      tabIndex="0"
      onKeyDown={(e) => {
          if(e.key === 'Enter') {
              this.ClickHandler();
          }
      }}>
        <label className="title" htmlFor="join">Join Us</label>
        <Profile ref={(ref)=>(this.profile=ref)}/>
       <Text text="User Name" name="username" onChange={this.handleChange.bind(this)}/>
       {errors.username.length > 0 && <span className='error'>{errors.username}</span>}
        <Text text="Email" name="email" onChange={this.handleChange.bind(this)}/>
        {errors.email.length > 0 && <span className='error'>{errors.email}</span>}
        <PasswordText text="Password" name="password" value={this.password} onChange={this.handleChange.bind(this)}/>
        {errors.password.length > 0 && <span className='error'>{errors.password}</span>}
         <SubmitButton text = "Sign Up" onClick={this.ClickHandler} />
      </div>
 
    );
  }
}

export default withRouter(Join);
