import React from 'react';
import styles from './text.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
const cx = classNames.bind(styles);

class text extends React.Component{
    constructor(props){
        super(props);
    this.state = {
        active :false,
    }
}

    focusLabelHandler=(e)=>{
        if(!e.target.value){
            this.setState((state)=>({
                active : !state.active
            }));
        }
    }

    render(){
        return (
        <div className={cx("form-div")}>
            <input className={cx("form-input")} name="text" type="text" 
            onFocus={this.focusLabelHandler}
            onBlur={this.focusLabelHandler} {...this.props}/>
            <label htmlFor="text" className={cx(
            "form-label", 
            this.state.active ? "focus-label" : "" 
          )}>{this.props.text}</label>
          {this.props.addchildren}
        </div>);
    }
}

text.propTypes={
    active : PropTypes.bool,
  }
  

export default text;