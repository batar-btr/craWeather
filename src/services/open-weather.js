import axios from './axios'

export default class OpenWeather {

    constructor(apiKey) {
        this.apiKey = apiKey
    }

    getResource = async url => {
        const res = await axios.get(`${url}&units=metric&appid=${this.apiKey}`)

        if(res.status !== 200) {
            throw(new Error(`Could not fetch ${url}, status: ${res.status}`))
        }

        return res;
    }

    currentWeatherByName = async name => {
        const res = await this.getResource(`weather?q=${name}`);
        return  this._transformCurrentWeather(res.data);
    }
    currentWeatherById = async id => {
        const res = await this.getResource(`weather?id=${id}`);
        return  await res.data;
    }
    fiveDayForecastByName = async name => {
        const res = await this.getResource(`forecast?q=${name}`);
        return  await res.data;
    }
    fiveDayForecastById = async id => {
        const res = await this.getResource(`forecast?id=${id}`);
        return  await res.data;
    }
    _transformCurrentWeather = ({name, dt, main, weather, sys}) => ({
        name: name,
        dt: dt,
        temp: main.temp,
        tempMin: main.temp_min,
        tempMax: main.temp_max,
        feelsLike: main.feels_like,
        sunrise:sys.sunrise,
        sunset: sys.sunset,
        description: weather[0].description
    })
}