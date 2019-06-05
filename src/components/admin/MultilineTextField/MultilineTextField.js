import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "1rem",
    justifyContent: "center",
    alignItems: "center"
  },
  textField: {
    width: "40rem",
    fontWeight: "bold"
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  notchedOutline: {
    borderColor: "#1C90FB !important"
  },
  placeholderText: {
    fontWeight: "bold"
  },
  size: {
    width: "38rem"
  }
});

class MultilineTextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      content: this.props.content,
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <TextField />
      // <div>
      //   <TextField className={classes.textField} id="outlined-multiline-static"
      //              multiline rows={this.props.rows} margin="normal" variant="outlined"
      //              placeholder="제목을 입력하세요." name="title"
      //              value={this.state.title} onChange={(e) => {
      //                  this.setState({ title: e.target.value })
      //                  console.log('title ', this.state.title);
      //                  }} />

      //   <TextField InputProps={{ classes: { input: classes.size } }} id="outlined-multiline-static"
      //              multiline rows="10" margin="normal" variant="outlined"
      //              placeholder="내용을 입력하세요." name="content"
      //              value={this.state.content} onChange={(e) => {
      //                  this.setState({ content: e.target.value })
      //                  console.log('1 ', this.state.content);
      //               } } />
      // </div>
    );
  }

//   handleChange = (e) => {
//       this.setState({
//           title: e.target.title,
//           content: e.target.content
//       });
//       console.log(this.state.title, this.state.content);
//   }
}

MultilineTextField.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MultilineTextField);
