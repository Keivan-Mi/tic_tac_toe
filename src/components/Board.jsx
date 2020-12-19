import React, { Component } from "react";
import { Container, Button, Typography } from "@material-ui/core";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

//Import my CSS style file
import "./style.css";

//Import my components
import Btn from "./Btn";
import Header from "./Header";

//---------------------------------------------------------------------------------------------------------------------
class Board extends Component {
  //Constructor of this class
  constructor(props) {
    super(props);

    this.state = {
      /*
       *btns    : 9 squares of the app
       *xIsNext : used for changing the turn
       */
      btns: Array(9).fill(null),
      xIsNext: true,
    };
  }

  //------------------------------------
  /*Function that I used for handel clicks in Btn component
   *Calling from renderBtns() when user push the button;
   */
  handleClick(i) {
    //Copy my btns array
    const btns = this.state.btns.slice();

    //If the game has a winner or the user selects the full square, the app returns nothing!
    if (this.calculateWinner(btns) || btns[i]) return;

    //Update status(put X or O)
    btns[i] = this.state.xIsNext ? "X" : "O";

    //Update the actual state
    this.setState({
      btns: btns,
      xIsNext: !this.state.xIsNext,
    });
  }

  //------------------------------------
  /*Function that I used for creating btn component
   *Calling from render();
   */
  renderBtns(i) {
    return (
      <Btn value={this.state.btns[i]} onClick={() => this.handleClick(i)} />
    );
  }

  //------------------------------------
  /*This function determines whether the game is over or not
   */
  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  //------------------------------------
  /*This function resets the game to its initial state
   */
  resetGame() {
    //Copy my state
    let btns = this.state.btns.slice();
    let xIsNext = this.state.xIsNext;

    //Change value of my copy state
    btns.fill(null);
    xIsNext = true;

    //Update the actual state
    this.setState({ btns: btns, xIsNext: xIsNext });
  }

  //------------------------------------
  /*This function checks that the array is full or not(check for tie situation)
   */
  checkArrayFull() {
    for (let i = 0; i < 9; i++) {
      if (this.state.btns[i] == null) return false;
    }
    return true;
  }

  checkArrayEmpty() {
    for (let i = 0; i < 9; i++) {
      if (this.state.btns[i] != null) return false;
    }
    return true;
  }
  //------------------------------------
  //Write an AI using minMax
  aIMove() {
    //Copy my state
    var squares = this.state.btns.slice();

    //Here is for the first move (random place at first)
    if (this.checkArrayEmpty()) {
      const ran = Math.floor(Math.random() * 10) % 9;
      squares[ran] = "X";
      //Update state
      this.setState({
        btns: squares,
        xIsNext: !this.state.xIsNext,
      });
    }
    //Here I use the minimax algorithm for finding the best move
    else {
      const AI = "X";
      const player = "O";

      var bestVal = -1000;
      var move = -1;
      var value;

      for (let i = 0; i < 9; i++) {
        if (squares[i] === null) {
          squares[i] = AI;
          value = this.minMax(squares, 0, false, AI, player);
          squares[i] = null;
          if (value > bestVal) {
            bestVal = value;
            move = i;
          }
        }
      }
      //AI move
      squares[move] = AI;
      this.setState({
        btns: squares,
        xIsNext: !this.state.xIsNext,
      });
    }
  }
  //------------------------------------
  //MinMax algorithm for finding the best move
  minMax(squares, depth, isMax, AI, player) {
    //Copy my state
    const status = this.calculateWinner(squares);

    //The termination conditions for recursive minimax function
    if (status) {
      if (status === player) {
        return -10;
      } else {
        return +10;
      }
    } else {
      if (this.checkArrayFull()) return 0;
    }

    //define variable for storing data
    var value;

    //Maximize node
    if (isMax) {
      var maxVal = -11;
      for (let i = 0; i < 9; i++) {
        if (squares[i] === null) {
          squares[i] = AI;
          value = this.minMax(squares, depth + 1, !isMax, AI, player);
          squares[i] = null;
          if (value > maxVal) {
            maxVal = value;
          }
        }
      }
      return maxVal;
    }
    //Minimize node
    else {
      var minVal = 11;
      for (let i = 0; i < 9; i++) {
        if (squares[i] === null) {
          squares[i] = player;
          value = this.minMax(squares, depth + 1, !isMax, AI, player);
          squares[i] = null;
          if (value < minVal) {
            minVal = value;
          }
        }
      }
      return minVal;
    }
  }

  //------------------------------------
  //Call the aIMove at first
  componentDidMount() {
    this.aIMove();
  }

  //Call the aIMove after each render(If AI turns)
  componentDidUpdate() {
    const a = this.state.xIsNext ? "X" : "O";
    if (a === "X") this.aIMove();
  }

  //------------------------------------
  render() {
    //------------------------------------
    //Check status
    /*status : null means the game hasn't a winner otherwise means the game is in a tie situation or has not been complete
     *colorM : Used for changing the style of status(actually it contains the CSS classes name)
     *
     */
    let status = this.calculateWinner(this.state.btns);
    var colorM;
    if (status) {
      if (status === "X") status = "AI win the match";
      else status = "You win the match";
      colorM = "status winStatus";
    } else if (this.checkArrayFull()) {
      status = "Its a tie!!";
      colorM = "status tieStatus";
    } else {
      status = "Your turns";
      colorM = "status playStatus";
    }

    //Return components
    return (
      <Container maxWidth="sm" className="container">
        <Header />

        <div className={colorM}>
          <Typography className="typography" gutterBottom>
            {status}
          </Typography>
        </div>

        <div className="row">
          {this.renderBtns(0)}
          {this.renderBtns(1)}
          {this.renderBtns(2)}
        </div>
        <div className="row">
          {this.renderBtns(3)}
          {this.renderBtns(4)}
          {this.renderBtns(5)}
        </div>
        <div className="row">
          {this.renderBtns(6)}
          {this.renderBtns(7)}
          {this.renderBtns(8)}
        </div>

        <Button
          className="deleteBtn"
          variant="contained"
          color="secondary"
          startIcon={<RotateLeftIcon />}
          onClick={() => {
            this.resetGame();
          }}
        >
          Reset
        </Button>
      </Container>
    );
  }
}

export default Board;
