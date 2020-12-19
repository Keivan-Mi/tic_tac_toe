import React, { Component } from "react";
import { Button, makeStyles } from "@material-ui/core";
import ResponsiveCssMaterialUi from "responsive-css-material-ui";
import "./style.css";

//make Css style
const myStyle = makeStyles({
  //Css codes
  btn: {
    width: "60px",
    height: "60px",
    margin: "5px",
    fontSize: "80px",
  },
});

const Btn = (props) => {
  var lg = { width: "100px", height: "100px" };
  var md = { width: "80px", height: "80px" };
  var sm = { width: "70px", height: "70px" };
  const classes = myStyle();
  return (
    <ResponsiveCssMaterialUi sm={sm} md={md} lg={lg}>
      <Button
        className={classes.btn}
        size="large"
        variant="contained"
        color="primary"
        onClick={props.onClick}
      >
        {props.value}
      </Button>
    </ResponsiveCssMaterialUi>
  );
};

export default Btn;
