import React from 'react';
import './App.css';
import StalactitePlot from './StalactitePlot';


const hierarchical_data = 
  {
    "name": "S&P500-Portfolio",
    "children": [
      {
      "name": "Technology",
      "children": [
        {
        "name": "Software-Infrastructure",
        "children": [
          {"name": "MSFT", "add_val": 211.91, "ratio_val": 24.15},
          {"name": "ORCL", "add_val": 59.96, "ratio_val": 18.40},
          {"name": "ADBE", "add_val": 18.78, "ratio_val": 27.27}
          ]
        },
        {
        "name": "Consumer Electronics",
        "children": [
          {"name": "AAPL", "add_val": 383.93, "ratio_val": 24.68},
          {"name": "SONY", "add_val": 88.71, "ratio_val": 7.63}
          ]
        },
        {
        "name": "Semiconductors",
        "children": [
          // {"name": "NVDA", "add_val": 32.68, "ratio_val": 31.59},
          // {"name": "AVGO", "add_val": 35.45, "ratio_val": 39.12},
          // {"name": "TXN", "add_val": 18.82, "ratio_val": 40.64}
          {"name": "NVDA", "add_val": 32.68, "ratio_val": 25.59},
          {"name": "AVGO", "add_val": 35.45, "ratio_val": 33.12},
          {"name": "TXN", "add_val": 18.82, "ratio_val": 34.64}
          ]
        }
      ]
      },
      {
      "name": "Commmunication Services",
      "children": [
        {
        "name": "Internet Content & Information",
        "children": [
          {"name": "GOOG", "add_val": 288.14, "ratio_val": 21.15},
          {"name": "META", "add_val": 120.52, "ratio_val": 18.71},
          {"name": "BIDU", "add_val": 18.80, "ratio_val": 12.07}
          ]
        },
        {
        "name": "Entertainment",
        "children": [
          {"name": "NFLX", "add_val": 32.13, "ratio_val": 13.22},
          {"name": "DIS", "add_val": 86.30, "ratio_val": 2.61},
          {"name": "WMG", "add_val": 5.95, "ratio_val": 7.04}
        ]
        }
      ]
      }
    ]
  }

class App extends React.Component {

  constructor(){
    super()
      this.state = {
        data: hierarchical_data
      };
  }

  render() {
    return (
        <div className="App">
            <StalactitePlot hierarchical_data={this.state.data}/>
        </div>
    )
  }
}
export default App;
