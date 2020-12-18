import React, { Component } from 'react';
import {Container , Button,Typography } from "@material-ui/core"
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import './style.css';

import Btn from './Btn'
import Header from './Header'

class Board  extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            btns : Array(9).fill(null),
            xIsNext: true,
         }
    }

    handleClick(i) {
        const btns = this.state.btns.slice();
        if(this.calculateWinner(btns) || btns[i])
            return;
        btns[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            btns: btns,
            xIsNext: !this.state.xIsNext,
        });
      }

    renderBtns(i) {
        return (
          <Btn
            value={this.state.btns[i]}
            onClick={() => this.handleClick(i)}
          />
        );
      }

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
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
      }
      
      resetGame(){
          let btns = this.state.btns.slice();
          let xIsNext = this.state.xIsNext;
          btns.fill(null); 
          xIsNext = true;

          this.setState({btns:btns ,xIsNext:xIsNext} )
      };

      checkArrayFull(){
          for(let i = 0 ; i<9 ; i++){
               if(this.state.btns[i] == null)
                    return false;
            }
            return true;
      }


    render() { 
       
        let status = this.calculateWinner(this.state.btns);
        var colorM ;
        if(status){
            status = "Player " + status + " win the match";
            colorM = "status winStatus";
        }
        else if (this.checkArrayFull()){
            status = 'Its a tie!!';
            colorM = "status tieStatus";
        }
        else{
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            colorM = "status playStatus";
        }
             
        return (
            <Container maxWidth="sm" className="container">
                <Header/>
                
                <div className={colorM}>
                    <Typography variant="h6" gutterBottom>
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

                <Button className="deleteBtn" variant="contained" color="secondary" startIcon={<RotateLeftIcon />} onClick={()=>{this.resetGame()}}>
                    Reset
                </Button>
          </Container>
        );
    }
}
 
export default Board ;