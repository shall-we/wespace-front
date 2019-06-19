import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        padding: theme.spacing.unit / 2,
        margin: theme.spacing.unit / 5,
    },
    chip: {
        margin: theme.spacing.unit / 2,
        padding: theme.spacing.unit / 5,
    },
    role: {
        padding: theme.spacing.unit / 2,
        margin: theme.spacing.unit / 4,
        backgroundColor: "primary"
    },
    grid: {
        alignContent: 'center',
        alignItems: 'center',
    }
});

class ChipsArray extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            members: this.props.members,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.members !== prevState.members) {
            return { members: nextProps.members };
        }
        return null;
    }

    render() {
        const { classes,onDelete,folder_id, user_id } = this.props;
        const id = folder_id && !user_id ? folder_id : user_id;
        return (
            <Paper className={classes.root}>
                {this.state.members.map((data, i) => {
                    return (<Grid item xs={10} sm={5} className={classes.grid}>
                                {(data.permission!=='OWNER')?(
                                <Chip label={data.label} onDelete={()=>onDelete[1](id,data.value)} className={classes.chip}
                                color={(data.permission==='MANAGER')?'primary':'secondary'} />
                                ):
                                <Chip avatar={<Avatar>M</Avatar>} label={data.label} className={classes.chip} />}
                            </Grid>
                    );
                })}
            </Paper>
        );
    }
}

ChipsArray.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChipsArray);
