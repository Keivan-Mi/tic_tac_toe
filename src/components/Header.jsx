import { Typography } from "@material-ui/core";

//Import my CSS style file
import "./style.css";

//---------------------------------------------------------------------------------------------------------------------
//SFC component (Style in style.css)
const Header = (props) => {
  return <Typography className="Header"> Tic Tac Toe </Typography>;
};

export default Header;
