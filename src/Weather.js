import React from "react";
import axios from "axios";
/* 
57776b760d0fd5cbe7d9e08dca8140eb 
Icon set - https://www.iconfinder.com/iconsets/weather-line-5 
https://www.iconfinder.com/iconsets/weather-260

Things to work on

1. Toggle temperature unit
2. Custom Icon for weather description
*/

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWeather: "https://api.openweathermap.org/data/2.5/weather?",
            forecast: "https://api.openweathermap.org/data/2.5/forecast?",
            location: "",
            currentHighTemp: "",
            currentLowTemp: "",
            currentDes: "",
            day2HighTemp: "",
            day2LowTemp: "",
            day2Des:"",
            day3HighTemp: "",
            day3LowTemp: "",
            day3Des:"",
            day4HighTemp: "",
            day4LowTemp: "",
            day4Des:"",
            day5HighTemp: "",
            day5LowTemp: "",
            day5Des:""
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(pos => {
            this.setState({
                currentWeather: `${this.state.currentWeather}lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&appid=57776b760d0fd5cbe7d9e08dca8140eb`,
                forecast: `${this.state.forecast}lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&appid=57776b760d0fd5cbe7d9e08dca8140eb`
            })

            axios.all([
                axios.get(this.state.currentWeather),
                axios.get(this.state.forecast)
            ])
                .then(axios.spread((currentWeatherRes, forecast) => {

                    const current = currentWeatherRes.data;
                    const forecasted = forecast.data;

                    this.setState({
                        location: current.name,
                        currentHighTemp: current.main.temp_max,
                        currentLowTemp: current.main.temp_min,
                        currentDes: current.weather[0].description,
                        day2HighTemp: forecasted.list[11].main.temp,
                        day2LowTemp: forecasted.list[12].main.temp,
                        day2Des: forecasted.list[11].weather[0].description,
                        day3HighTemp: forecasted.list[19].main.temp,
                        day3LowTemp: forecasted.list[20].main.temp,
                        day3Des: forecasted.list[19].weather[0].description,
                        day4HighTemp: forecasted.list[27].main.temp,
                        day4LowTemp: forecasted.list[28].main.temp,
                        day4Des: forecasted.list[27].weather[0].description,
                        day5HighTemp: forecasted.list[35].main.temp,
                        day5LowTemp: forecasted.list[36].main.temp,
                        day5Des: forecasted.list[35].weather[0].description,
                    })
                }));
        });
    }

    Click = () => {
        const fahrenheit = this.state.celsius * (9 / 5) + 32;
        if (this.state.currentHighTemp < fahrenheit) {
            this.setState({
                currentHighTemp: fahrenheit
            });
        } else {
            this.setState({
                currentHighTemp: this.state.celsius
            });
        }
    };

    render() {
        let today = new Date();
        let day2 = new Date();
        let day3 = new Date();
        let day4 = new Date();
        let day5 = new Date();

        const options = {weekday: "long", day:"numeric", month:"long"}

        day2.setDate(today.getDate()+1);
        day3.setDate(today.getDate()+3);
        day4.setDate(today.getDate()+4);
        day5.setDate(today.getDate()+5);

        today = today.toLocaleString("en-US", options)
        day2 = day2.toLocaleString("en-US", options)
        day3 = day3.toLocaleString("en-US", options)
        day4 = day4.toLocaleString("en-US", options)
        day5 = day5.toLocaleString("en-US", options)

        return (
            <div>
                <div>
                    <div>Current Location: {this.state.location}</div>
                    <div>Today</div>
                    <div>High: {this.state.currentHighTemp}</div>
                    <div>Low: {this.state.currentLowTemp}</div>
                    <div>Description: {this.state.currentDes}</div>

                    <div>{day2}</div>
                    <div>High: {this.state.day2HighTemp}</div>
                    <div>Low: {this.state.day2LowTemp}</div>
                    <div>Description: {this.state.day2Des}</div>

                    <div>{day3}</div>
                    <div>High: {this.state.day3HighTemp}</div>
                    <div>Low: {this.state.day3LowTemp}</div>
                    <div>Description: {this.state.day3Des}</div>

                    <div>{day4}</div>
                    <div>High: {this.state.day4HighTemp}</div>
                    <div>Low: {this.state.day4LowTemp}</div>
                    <div>Description: {this.state.day4Des}</div>
                    
                    <div>{day5}</div>
                    <div>High: {this.state.day5HighTemp}</div>
                    <div>Low: {this.state.day5LowTemp}</div>
                    <div>Description: {this.state.day5Des}</div>
                </div> 

                <button onClick={this.Click}>Toggle Settings</button>
            </div>
        );
    }
}

export default Weather;
