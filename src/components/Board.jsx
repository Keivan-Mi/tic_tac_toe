import React, { Component } from 'react';

import Btn from './Btn'

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

    render() { 
       
        let status = this.calculateWinner(this.state.btns);
        if(status)
            status = "Player " + status + " win the match";
        else
             status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        return (
            <div>
                <button onClick={()=>{this.resetGame()}}> Reset </button>
                <div className="status">{status}</div>
                <div>
                    {this.renderBtns(0)}
                    {this.renderBtns(1)} 
                    {this.renderBtns(2)}
                </div>
                <div>
                    {this.renderBtns(3)}
                    {this.renderBtns(4)} 
                    {this.renderBtns(5)}
                </div>
                <div>
                    {this.renderBtns(6)}
                    {this.renderBtns(7)} 
                    {this.renderBtns(8)}
                </div>
          </div>
        );
    }
}
 
export default Board ;