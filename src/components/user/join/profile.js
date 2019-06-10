import React from "react";
import style from './profiles.scss';
import defaultProfile from "./default_profile.png";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import classNames from 'classnames';

const cx=classNames.bind(style);



class Profile extends React.Component {
 
    onClickFileOpenHandler=e=>{
        console.log('onClickFileOpenHandler');
        e.preventDefault();
        this.fileOpen.click();
    };
  onImagePreviewHandler = e => {
      console.log('onImagePreviewHandler');
     

    if (e.target.files && e.target.files[0]) {
     
        let reader = new FileReader();

        reader.onload=()=>{
            this.img.setAttribute("src", reader.result);
        };

        
      reader.readAsDataURL(e.target.files[0]);
        return;
    }

  };

  getImgPath=()=>{
    //return this.fileOpen.files[0].path;
    const {files} = this.fileOpen;
    //console.log(files[0]);

    if(files&&files[0] ){//&&this.state.isResize){
      console.log('before :', files[0]);
      console.log(this.state.image);
      let formData = new FormData();
        console.log('resized!');
        //formData.append('profile', this.state.image);
        formData.append('profile', files[0]);
        return formData;
      
    }else {
      console.log(defaultProfile);
      let formData = new FormData();
      formData.append('profile', this.img.src);
      return formData;
    }
  }

  render() {
    return (
      <div className={cx("profile")}>
        <div onClick={this.onClickFileOpenHandler.bind(this)}>
        <img id="profile" src={defaultProfile} ref={ref => (this.img = ref)} alt="profile" />
        <Fab color="primary" aria-label="Add" >
        <AddIcon />
        </Fab>
        </div>
        <input type="file" onChange={this.onImagePreviewHandler.bind(this)} ref={(ref)=>(this.fileOpen=ref)}/>
      </div>
    );
  }
}

export default Profile;