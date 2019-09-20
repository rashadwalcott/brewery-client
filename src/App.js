import React from 'react';
import BreweryList from './BreweryList'

export default class App extends React.Component {

  state = {
    allBreweries: []
  }

  componentDidMount() {
    fetch(`http://localhost:3000/breweries`)
    .then(res => res.json())
    .then(breweries => {
      this.setState({allBreweries: breweries})
    })
  }


  render () {
    // console.log(this.state.allBreweries);
    return (
      <div className="App">
      <header className="App-header">
        <h1>San Diego Breweries</h1>
      </header>
      <BreweryList breweries={this.state.allBreweries} />
    </div>
    );
  }
}
