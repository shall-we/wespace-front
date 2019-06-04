import React from 'react';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const styles = theme =>({
    dom : {
      margin : theme.spacing.unit*1.5,
      borderRadius :'20px',
      width : "25%",
      minWidth:"330px",
      fontSize : "18px",
      backgroundColor : "rgb(43, 116, 226)",
    },
  }
  );

function submitButton (props){
    const {classes} =props;
    return (
        <Button variant="contained" color="primary" className={classes.dom} {...props}>
          {props.text}
         </Button>
    );
}

submitButton.propTypes = {
    classes : PropTypes.object.isRequired,
}

export default withStyles(styles) (submitButton); 
