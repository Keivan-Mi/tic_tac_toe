import { Button, makeStyles } from "@material-ui/core";
import ResponsiveCssMaterialUi from "responsive-css-material-ui";

//Import my CSS style file
import "./style.css";

//---------------------------------------------------------------------------------------------------------------------
//Make CSS style using material-UI for Buttons(Also I used my style.css for styling these buttons)
const myStyle = makeStyles({
  //CSS class
  btn: {
    width: "60px",
    height: "60px",
    margin: "5px",
    fontSize: "80px",
  },
});
//---------------------------------------------------------------------------------------------------------------------
//SFC component
const Btn = (props) => {
  //My style
  const classes = myStyle();

  /*responsive-css-material-ui
   *For more information : https://www.npmjs.com/package/responsive-css-material-ui
   */
  var lg = { width: "100px", height: "100px" };
  var md = { width: "80px", height: "80px" };
  var sm = { width: "70px", height: "70px" };

  //Return component
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
