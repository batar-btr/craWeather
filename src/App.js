import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import OpenWeather from './services/open-weather';
import getCities from './services/getCities'
import Preloader from './components/preloader';
// import UpdateTime from './components/update-time';
import Header from './components/header'
import CitySearch from './components/city-search'
import Main from './components/main'
import Info from './components/info'
// import Clock from './components/clock'

const APIKEY = 'dd3a270b23d98cf77f4b36c4d4e8ab8c'
const url = 'https://gist.githubusercontent.com/batar-btr/23f6920edc0dd518984a8c0ade613adf/raw/92020e3b0ca0877b6668f3ba2ecb7b35bdd4817a/ukr_cities.json'

export default class App extends Component {

  state = {
    error: null,
    isLoaded: false,
    current: null,
    forecast: null,
    timeFromUpdate: 0,
    cityNames: null,
    blur: false
  }

  openWeather = new OpenWeather(APIKEY);

  async componentDidMount() {
    const { currentWeatherByName } = this.openWeather;

    try {
      await (ms => new Promise(res => setTimeout(res, ms)))(5000);
      await currentWeatherByName('Kharkov')
        .then(
          res => this.setState({ current: res }),
          err => this.setState({ error: err })
        );
      await getCities(url)
        .then(
          res => this.setState({ cityNames: res.data }),
          err => this.setState({ error: err })
        );

      if (this.state.current) {
        this.timeFromUpdate()
      }

      this.setState({ isLoaded: true })
    } catch (error) {
      this.setState({ error })
    }

  }

  timeFromUpdate = () => {
    this.updateInterval = setInterval(() => this.setState(state => ({ timeFromUpdate: state.timeFromUpdate + 60 })), 60000)
  }

  updateBlur = status => this.setState({ blur: status})

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Ошибка</div>
    } else if (!isLoaded) {
      return (
        <Preloader />
      );
    } else {
      return (
        <AppView
          temp={this.state.current}
          cityNames={this.state.cityNames}
          blur={this.state.blur}
          updateBlur={this.updateBlur}
        />
      );
    }
  }
}

const AppView = ({ temp, cityNames, blur, updateBlur }) => {
  return (
    <div className="App">
      <Header />
      <CitySearch cityNames={cityNames} toggleBlur={updateBlur} />
      <Main temp={temp.temp} blur={blur} />
      <Info data={temp} blur={blur} />
    </div>
  );
};



// <header className="App-header">
//   <img src={logo} className="App-logo" alt="logo" />
//   <p>
//     Edit <code>src/App.js</code> and save to reload.
//           </p>
//   {/* <p><Clock/></p> */}
//   <a
//     className="App-link"
//     href="https://reactjs.org"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     Learn React
//           </a>
//   <UpdateTime time={time} />
// </header>