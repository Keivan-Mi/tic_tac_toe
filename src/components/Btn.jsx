import React, { Component } from 'react';
import {Button} from '@material-ui/core'



const Btn = (props)=>{
    return(
        <Button size="large" variant="contained" color="primary" onClick = {props.onClick} >
            {props.value} 
        </Button>
    );
};

export default Btn ;

