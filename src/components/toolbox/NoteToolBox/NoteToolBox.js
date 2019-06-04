import React, { Children } from 'react';
import styles from './NoteToolBox.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


  class NoteToolBox extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            focused: 0 
        }
    }
    getInitialState=()=>{
        return { focused: 0 };
    }
 
    clicked=(index)=>{
        this.setState({focused: index});
    }


    render(){
        const {focused} =this.state;
        const {clicked}=this;
        
        return (
            <div className={cx('NoteToolBox')}>
            <div className={cx('bar')}>
            { this.props.items.map(function(m, index){
                let style = '';
                if(focused === index){style = 'focused';}    
                return <div className={cx('btn',style)} onClick={()=>clicked(index)}>{m}</div>;
            })} 
            </div>

            <div className={cx('tool-page')}>
            {this.props.children[this.state.focused]}
            </div>
        </div>
        )
    }
} 
 



export default NoteToolBox;
