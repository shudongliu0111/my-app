import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//   // constructor(){
//   //   super();
//   //   this.state = {
//   //     value: null,
//   //   };
//   // }
//   render() {
//     return (
//       <button className="square" onClick = {() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }
//上面的是类的形式 下面的是函数形式 简单的组件建议用函数形式
function Square(props) {
  return (
    // 不能写onClick={props.onClick()}
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(){
    super();
    this.state ={
      squares: Array(9).fill(null),
      xIsNext: true, //判断下一个落子方，当前是X
    }
  }
  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]} 
        onClick = {()=>this.handleClick(i)}
      />
    );
  }
  //处理点击事件函数 修改组件状态 并且实现交替落子
  handleClick(i){
    // alert(this.state.xIsNext);
    const squares = this.state.squares.slice();
    // 判断落子方 修改状态
    squares[i] = this.state.xIsNext? 'X' : 'O';
    this.setState({
      squares, //squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

  function calculateWinner(squares) {
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