import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop:'-0.5rem',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

function AlignItem(props){
  const classes = useStyles();

return(
  <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://item.kakaocdn.net/do/4be9625c0426fb7d21c0bff1e8af2e1df43ad912ad8dd55b04db6a64cddaf76d" />
        </ListItemAvatar>
        <ListItemText
          primary= {props.data.message}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
               {props.data.from}
              </Typography>
              {props.data.reg_date}
            </React.Fragment>
          }
        />
      </ListItem>
)


}



function AlignItemsList(props) {
  const classes = useStyles();
  
  const items=props.rows.map((item,idx)=>{

    console.log(item);
    return < AlignItem  key={idx} data={item}/>
  })


  return (
    <List className={classes.root}>
      {items}
    </List>
  );
}

export default AlignItemsList;