import React from 'react';
import './App.css';


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      dollars: "",
      btc: "1",
      price: {}
    }
    this.dollarChange = this.dollarChange.bind(this)
    this.btcChange = this.btcChange.bind(this)
  }

  dollarChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value,
      btc: ((event.target.value / this.state.price).toFixed(8))
    })
    if (isNaN(event.target.value)) {
        this.setState({
          btc: "Not a number."
        })
    }
    if (event.target.value === ".") {
      this.setState({
        btc: "Waiting..."
      })
    }
  }

  btcChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value, 
      dollars: ((event.target.value * this.state.price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","))
    })
    if (isNaN(event.target.value)) {
      this.setState({
        dollars: "Please enter a number."
      })
  }
    if (event.target.value === ".") {
      this.setState({
        dollars: "Waiting..."
      })
    }
  }

  componentDidMount() {
    fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then(response => response.json())
      .then(result => {
        this.setState({
          price: [result.bpi.USD.rate_float],
        })
        this.setState({ dollars: (this.state.btc * this.state.price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")})
      })
  }

  render() {
    return (
      <div className="App">
        <form>
          <label>
            $
            <input 
              type="text" 
              name="dollars" 
              value={this.state.dollars}
              onChange={this.dollarChange}
              />
          </label>
          <label>
              BTC
            <input 
              type="text" 
              name="btc"
              value={this.state.btc}
              onChange={this.btcChange}
              />
          </label>
        </form>
          <h3>Powered by <a href = "https://www.coindesk.com/price/bitcoin">CoinDesk</a></h3>
      </div>
    );
  }
}

export default App;
