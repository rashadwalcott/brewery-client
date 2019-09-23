componentDidMount() {
  fetch(`http://localhost:3000/breweries`)
  .then(res => res.json())
  .then(breweries => {
    this.setState({allBreweries: breweries})
  })
}
