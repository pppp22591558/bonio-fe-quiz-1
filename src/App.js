import React, { Component } from 'react';
import './App.css';

const COLUMN = 10;
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
    );
  }
}

export default App;
