import React from 'react';
import Text from './text';
import PropTypes from 'prop-types';

class passwordText extends React.Component{
    
    state = {
        showPassword: false,
      };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword}));
  };
  
  content =  (
    <img alt="showPassword"
    src="https://img.icons8.com/ios/50/000000/visible.png"
    onClick={this.handleClickShowPassword} className="right-end"/>
    );
  

  render (){
    return  (
      <Text
      type={this.state.showPassword ? "text" : "password"} 
       addchildren={this.content} {...this.props}/>
      );
  }
}

passwordText.propTypes={
  showPassword :PropTypes.bool,
  password : PropTypes.string,
}

export default passwordText;
