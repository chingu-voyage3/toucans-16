import React from "react";
import axios from "axios";
/* 
57776b760d0fd5cbe7d9e08dca8140eb 
Icon set - https://www.iconfinder.com/iconsets/weather-line-5 
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
            currentIco: "",
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
            day5Des:"",
            celsiusUnit:true,
            unit: "Celsius"
        };
    }

    componentDidMount() {

        navigator.geolocation.getCurrentPosition(pos => {
            this.setState({
                currentWeather: `${this.state.currentWeather}lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&appid=57776b760d0fd5cbe7d9e08dca8140eb`,
                forecast: `${this.state.forecast}lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&appid=57776b760d0fd5cbe7d9e08dca8140eb`
            })
            
            const getAPI = () =>{
                axios.all([
                    axios.get(this.state.currentWeather),
                    axios.get(this.state.forecast)
                ]).then(axios.spread((currentWeatherRes, forecast) => {
                    const current = currentWeatherRes.data;
                    const forecasted = forecast.data;

                    console.log(current)
                    console.log(current.weather[0].icon) // 04d
                    this.setState({
                        location: current.name,
                        currentHighTemp: current.main.temp_max,
                        currentLowTemp: current.main.temp_min,
                        currentDes: current.weather[0].description,
                        currentIco: `./WeatherIcons/${current.weather[0].icon}.svg`,
                        day2HighTemp: Math.round(forecasted.list[11].main.temp),
                        day2LowTemp: Math.round(forecasted.list[12].main.temp),
                        day2Des: forecasted.list[11].weather[0].description,
                        day3HighTemp: Math.round(forecasted.list[19].main.temp),
                        day3LowTemp: Math.round(forecasted.list[20].main.temp),
                        day3Des: forecasted.list[19].weather[0].description,
                        day4HighTemp: Math.round(forecasted.list[27].main.temp),
                        day4LowTemp: Math.round(forecasted.list[28].main.temp),
                        day4Des: forecasted.list[27].weather[0].description,
                        day5HighTemp: Math.round(forecasted.list[35].main.temp),
                        day5LowTemp: Math.round(forecasted.list[36].main.temp),
                        day5Des: (forecasted.list[35].weather[0].description)
                    })
                }));
            }
            getAPI();
            setInterval(getAPI, 300000)
        });
    }

    FahrenheitFunction = () => {
        this.setState({
            currentHighTemp: Math.round(this.state.currentHighTemp * (9 / 5) + 32),
            currentLowTemp: Math.round(this.state.currentLowTemp * (9 / 5) + 32),
            day2HighTemp: Math.round(this.state.day2HighTemp * (9 / 5) + 32),
            day2LowTemp: Math.round(this.state.day2LowTemp * (9 / 5) + 32),
            day3HighTemp: Math.round(this.state.day3HighTemp * (9 / 5) + 32),
            day3LowTemp: Math.round(this.state.day3LowTemp * (9 / 5) + 32),
            day4HighTemp: Math.round(this.state.day4HighTemp * (9 / 5) + 32),
            day4LowTemp: Math.round(this.state.day4LowTemp * (9 / 5) + 32),
            day5HighTemp: Math.round(this.state.day5HighTemp * (9 / 5) + 32),
            day5LowTemp: Math.round(this.state.day5LowTemp * (9 / 5) + 32),
            celsiusUnit: !this.state.celsiusUnit,
            unit: "Fahrenheit"
        })
    }

    CelsiusFunction = () => {
        this.setState({
            currentHighTemp: Math.round((this.state.currentHighTemp - 32) / (9 / 5)),
            currentLowTemp: Math.round((this.state.currentLowTemp - 32) / (9 / 5)),
            day2HighTemp: Math.round((this.state.day2HighTemp - 32) / (9 / 5)),
            day2LowTemp: Math.round((this.state.day2LowTemp - 32) / (9 / 5)),
            day3HighTemp: Math.round((this.state.day3HighTemp - 32) / (9 / 5)),
            day3LowTemp: Math.round((this.state.day3LowTemp - 32) / (9 / 5)),
            day4HighTemp: Math.round((this.state.day4HighTemp - 32) / (9 / 5)),
            day4LowTemp: Math.round((this.state.day4LowTemp - 32) / (9 / 5)),
            day5HighTemp: Math.round((this.state.day5HighTemp - 32) / (9 / 5)),
            day5LowTemp: Math.round((this.state.day5LowTemp - 32) / (9 / 5)), 
            celsiusUnit: !this.state.celsiusUnit,
            unit: "Celsius"
        })
    }

    Click = () => {
        if(this.state.celsiusUnit){
            this.FahrenheitFunction()
        }
        else{
            this.CelsiusFunction()
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
        day3.setDate(today.getDate()+2);
        day4.setDate(today.getDate()+3);
        day5.setDate(today.getDate()+4);

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
                    <div>{this.state.currentDes}</div>

                    <div>
                        <img src={this.state.currentIco} alt={this.state.currentIco}/>
                    </div>

                    <div>{day2}</div>
                    <div>High: {this.state.day2HighTemp}</div>
                    <div>Low: {this.state.day2LowTemp}</div>
                    <div>{this.state.day2Des}</div>

                    <div>{day3}</div>
                    <div>High: {this.state.day3HighTemp}</div>
                    <div>Low: {this.state.day3LowTemp}</div>
                    <div>{this.state.day3Des}</div>

                    <div>{day4}</div>
                    <div>High: {this.state.day4HighTemp}</div>
                    <div>Low: {this.state.day4LowTemp}</div>
                    <div>{this.state.day4Des}</div>
                    
                    <div>{day5}</div>
                    <div>High: {this.state.day5HighTemp}</div>
                    <div>Low: {this.state.day5LowTemp}</div>
                    <div>{this.state.day5Des}</div>
                </div> 

                <button onClick={this.Click}>{this.state.unit}</button>
            </div>
        );
    }
}

export default Weather;
