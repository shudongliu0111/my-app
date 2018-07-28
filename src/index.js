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
  // constructor(){
  //   super();
  //   this.state ={
  //     squares: Array(9).fill(null),
  //     xIsNext: true, //判断下一个落子方，当前是X
  //   }
  // } 
  // 状态提升到game 所以和square一样 删掉构造方法
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]} 
        onClick = {()=>this.props.onClick(i)}
      />
    );
  }
  //处理点击事件函数 修改组件状态 并且实现交替落子
  // handleClick(i){
  //   const squares = this.state.squares.slice();
  //   // alert('winner：'+ calculateWinner(squares) + '有没有：'+squares[i]);
  //   if (calculateWinner(squares) || squares[i]) {
  //     // 没有赢家返回 null 该位置没有值返回的是 默认值 null
  //     return;
  //   }
  //   // 判断落子方 修改状态
  //   squares[i] = this.state.xIsNext? 'X' : 'O';
  //   this.setState({
  //     squares, //squares: squares,
  //     xIsNext: !this.state.xIsNext,
  //   });
  // }

  render() {
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = 'Winner: ' + winner;
    // } else {
    //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // }

    return (
      <div>
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
  constructor(props){
    super(props);
    this.state = {
      history:[
        {
          squares:Array(9).fill(null),
        }
      ],
      xIsNext:true,
      stepNumber:0
    };
  }

 handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber :history.length
    });
  }

  jumpTo(step){
    this.setState({
      stepNumber:step,
      xIsNext: (step % 2)? false : true
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step,move)=> {
      const desc = move? "返回到"+ move : "开始游戏";
      return  (
        <li key={move}>
          <button onClick={()=>this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }


    return (
      <div className="game">
        <div className="game-board">
           <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{moves}</ol>
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