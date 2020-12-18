import React, { Component } from 'react';
import {Typography} from "@material-ui/core"
import './style.css';

const Header = (props)=>{
    return(
        <Typography variant="h2" className="Header" > Tic Tac Toe </Typography> 
    );
};

export default Header ;