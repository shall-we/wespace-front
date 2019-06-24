import React, { Component } from 'react';
import '../common/page.css';
import SubmitButton from '../common/submitButton';
import Text from '../common/text';
import PasswordText from '../common/passwordText';
import Profile from './profile';
import './joinPage.css';
import {withRouter} from 'react-router-dom';
import AlertModal from '../../modal/AlertModal/AlertModal';

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
            alertVisible : false,
            result_join : null,
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


    ClickHandler = async () => {
        //select id, name from user where name NOT IN(select name from user, folder_list where user.id=folder_list.user_id and folder_list.id=###)
        const {username,email,password} =this.state;
        //console.log('getImageFile',this.profile.getImgFile());

        const formdata = this.profile.getImgFile();
        formdata.append('name', username);
        formdata.append('email', email);
        formdata.append('password', password);

        let result=await this.props.action(formdata);

        console.log('result', result);

        if(result.result==='success'){
            this.props.history.push('/');
        }else{
            let content= '회원가입에 실패했습니다.'+
                ' 다시 시도해 주세요.('+result.failType+')';
            this.setState({alertVisible : true, result_join : content});
        }
        console.log('sjdksjdks',username,email,password);
    }
    onhandleShowModal=()=>{
        this.setState({alertVisible :!this.state.alertVisible});
    };

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
                <AlertModal visible={this.state.alertVisible} onCancel={this.onhandleShowModal} modal_title='JOIN' modal_content={this.state.result_join}/>
            </div>

        );
    }
}

export default withRouter(Join);