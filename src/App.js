import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import OpenWeather from './services/open-weather';

const APIKEY = 'dd3a270b23d98cf77f4b36c4d4e8ab8c'


export default class App extends Component {

  openWeather = new OpenWeather(APIKEY);

  async componentDidMount() {
    const { currentWeatherByName, currentWeatherById, fiveDayForecastByName } = this.openWeather

    await currentWeatherByName('Kharkov')
      .then(result => console.log(result));

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}