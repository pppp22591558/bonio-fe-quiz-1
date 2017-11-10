import React, { Component } from 'react';
import './App.css';

const COLUMN = 5;
const LIMIT = 5;

class App extends Component {
  constructor(props) {
    super(props);
    this.column = props.column || COLUMN;
    this.size = Math.pow(this.column, 2);
    this.limit = props.limit || LIMIT ;
    const occupied = this.pickNonRepeatingNumbers(this.size, this.limit);
    const lands = new Array(this.size).fill(0).map((v, i) => {
      if (occupied.indexOf(i) > 0) return 1;
      return 0;
    });
    this.lands = lands;
    this.occupied = occupied;
  }
  state = {
    chosenLands: [],
    chosenAndOccupiesLands: [],
  }
  pickNonRepeatingNumbers(range, limit) {
    let i = limit;
    const pool = new Array(range).fill(0).map((v, i) => i);
    const randomNumbers = [];
    while (i-- > 0) {
      const index = Math.floor(Math.random() * pool.length)
      randomNumbers.push(pool[index]);
      pool.splice(index, 1);
    }
    return randomNumbers;
  }
  selectLand(i) {
    this.setState(prevState => {
      return {
        chosenLands: [...prevState.chosenLands, i],
        ...this.occupied.indexOf(i) > -1 ? {
          chosenAndOccupiesLands: [...prevState.chosenAndOccupiesLands, i],
        } : {},
      };
    });
  }
  render() {
    const { chosenLands, chosenAndOccupiesLands } = this.state;
    if (chosenAndOccupiesLands.length === this.limit) return (
      <div className="App"><h1 style={{ width: '100%' }}>YOU WIN!!!</h1></div>
    )
    return (
      <div className="App">
        <div style={{ marginBottom: 20 }}>
          拆炸彈遊戲題目：請實現如以下5x5的土地<br/>
          預設埋藏5顆炸彈<br/>
          點到沒有炸彈的土地會顯示綠色<br/>
          拆到炸彈會顯示紅色<br/>
          拆光了會顯示勝利！<br/>
          (建議可以使用<a href="https://github.com/facebookincubator/create-react-app">create-react-app</a>來生成scaffold)
        </div>
        <div className="lands">
          {
            this.lands.map((land, i) => {
              const isChosen = chosenLands.indexOf(i) > -1;
              const isOccupied = chosenAndOccupiesLands.indexOf(i) > -1;
              return (
                <div
                  style={{ flexBasis: `${100 / this.column}%` }}
                  className={`land${isChosen ? ' chosen' : ''}${isOccupied ? ' occupied' : ''}`}
                  key={i}
                  onClick={() => {
                    if (isChosen) return;
                    this.selectLand(i, land)
                  }}
                />
              );
            })
          }
        </div>
        <div style={{ marginTop: 20 }}>
          延伸問題：<br/>
          Readability   - 你的程式碼是否易讀、簡潔、DRY，建構函式的邏輯是否易懂，很好解釋你的邏輯<br/>
          Reusability   - 如果要讓地圖改變成10x10，埋10顆炸彈，你的程式碼需要變動多少<br/>
          Extensibility - 如果要實時配對對手，讓對手選擇埋藏炸彈的位置，你負責拆，你的程式碼會如何變動<br/>
        </div>
      </div>
    );
  }
}

export default App;
