import React, {Component} from 'react'

class App extends Component {
  state = {
    weather: null,
    inCelsius: false
  }

  fetchWeather = () => {
    navigator.geolocation.getCurrentPosition(position => {
      fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
        .then(res => res.json()).then(data => {
          this.setState({weather: data})
        })
    })
  }

  weatherInF = weather => {
    let fValues = {...weather}

    fValues.main.temp = this.convertToF(fValues.main.temp)
    fValues.main.temp_min = this.converToF(fValues.main.temp_min)
    fValues.main.temp_max = this.converToF(fValues.main.temp_max)

    return fValues
  }

  angleToDirection = angle => {
    let idx = Math.floor((angle / 22.5) + 0.5)

    let directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']

    return directions[idx % 16];
  }

  convertToF = celsius => {
    return Math.round(celsius * 9 / 5 + 32)
  }

  componentDidMount() {
    this.fetchWeather()
  }

  render() {
    const {weather, inCelsius} = this.state
    const date = new Date()

    return(
      weather ? (
      <div>
        <h1>Local Weather App</h1>
        <h3>{`Current Weather in ${weather.name}, ${weather.sys.country}`}</h3>
            <h3>{
              inCelsius ? `${weather.main.temp} °C` :
                `${this.convertToF(weather.main.temp)} °F`}
            </h3>
      </div>
    ) : <div>Loading weather...</div>
    )
  }
}

export default App;

// {
//   coord: {
//     lon: 139,
//     lat: 35
//   },
//
//   weather: [
//     {
//       id: 803,
//       main: "Clouds",
//       description: "broken clouds"
//     }
//   ],
//
//   base: "stations",
//
//   main: {
//     temp: 28.23, C -> F
//     pressure: 1011, X 1/ 1000 = Bar -> inHg
//     humidity: 74, %
//     temp_min: 26, C -> F
//     temp_max: 31  C -> F
//   },
//
//   visibility: 10000, miles -> meters
//
//   wind: {
//     speed: 3.6, m/s -> mph
//     deg: 230
//   },
//   clouds: {
//     all: 75
//   },
//   dt: 1499396400,
//   sys: {
//     type: 1,
//     id: 7616,
//     message: 0.0043,
//     country: "JP",
//     sunrise: 1499369792,
//     sunset: 1499421666
//   },
//   id: 1851632,
//   name: "Shuzenji",
//   cod: 200
//   }
