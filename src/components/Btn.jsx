import React, { Component } from 'react';
import {Button , makeStyles} from '@material-ui/core'
import './style.css';

//make Css style
const myStyle = makeStyles({
    //Css codes
    btn:{
        width: '100px',
        height: '100px',
        margin:'5px',
        fontSize:'80px',
    },  
});

const Btn = (props)=>{
    const classes = myStyle();
    return(
        <Button className={classes.btn} size="large" variant="contained" color="primary" onClick = {props.onClick} >
            {props.value} 
        </Button>
    );
};

export default Btn ;

