import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import WeatherDisplay from "./WeatherDisplay";
import WeatherButton from "./WeatherButton";
import Hideable from "../Hideable";
import "./Weather.css";

const cache = {};

function importAll(r) {
    r.keys().forEach(key => {
        const start = key.indexOf("/");
        const end = key.lastIndexOf(".");
        const name = key.substring(start + 1, end);
        cache[name] = r(key);
    });
}

importAll(require.context("./icons/", true, /\.png$/));

class Weather extends Component {
    state = {
        selected: 0,
        city: "",
        temp: 0,
        desc: "",
        icon: "",
        imperial: localStorage.getItem("weather-units") === "imperial",
        forecast: []
    };
    componentDidMount() {
        this.interval = setInterval(this.getWeatherData(), 10800000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    getWeatherData = () => {
        navigator.geolocation.getCurrentPosition(pos => {
            const url = "https://api.weatherbit.io/v2.0/";
            const opt = `?lat=${pos.coords.latitude}&lon=${
                pos.coords.longitude
            }&key=`;
            const key = "ab72c18401744e1f8ea54a2e66ea9df5";
            const currentReq = `${url}current${opt}${key}`;
            const forecastReq = `${url}forecast/daily${opt}${key}`;
            axios.all([axios.get(currentReq), axios.get(forecastReq)]).then(
                axios.spread((curr, fore) => {
                    const forecast = [];
                    const date = new Date();
                    const week = [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday"
                    ];
                    let dayNum = date.getDate();
                    for (let i = 0; i < 5; i += 1) {
                        const min = Math.round(fore.data.data[i].min_temp);
                        const max = Math.round(fore.data.data[i].max_temp);
                        forecast.push({
                            day: week[date.getDay()],
                            min,
                            max,
                            minF: this.toFahrenheit(min),
                            maxF: this.toFahrenheit(max),
                            icon: fore.data.data[i].weather.icon,
                            desc: fore.data.data[i].weather.description,
                            key: _.uniqueId()
                        });
                        dayNum = (dayNum + 1) % 7;
                        date.setDate(dayNum);
                    }
                    this.setState({
                        city: curr.data.data[0].city_name,
                        temp: Math.round(curr.data.data[0].temp),
                        tempF: this.toFahrenheit(
                            Math.round(curr.data.data[0].temp)
                        ),
                        desc: curr.data.data[0].weather.description,
                        icon: curr.data.data[0].weather.icon,
                        forecast
                    });
                })
            );
        });
    };
    toFahrenheit = c => Math.round(c * 9 / 5 + 32);
    handleDayChange = index => {
        this.setState({
            selected: index
        });
    };
    convertUnits = () => {
        if (this.state.imperial)
            localStorage.setItem("weather-units", "metric");
        else localStorage.setItem("weather-units", "imperial");
        this.setState({ imperial: !this.state.imperial });
    };
    render() {
        const Button = (
            <div className="weather__toggle">
                <img src={cache[this.state.icon]} alt="weather-btn" />
                <div
                    style={{
                        textAlign: "center",
                        border: "none",
                        textShadow: "0 1px 0 rgba(0, 0, 0, 0.3)"
                    }}
                >
                    <div className="weather__toggle__temp">
                        {this.state.imperial
                            ? this.state.tempF
                            : this.state.temp}&#176;
                    </div>
                    <div className="weather__toggle__city">
                        {this.state.city.toUpperCase()}
                    </div>
                </div>
            </div>
        );
        return (
            <Hideable
                label={Button}
                dir="top"
                align="flex-end"
                margin="1.5vmin 2vmin 1vmin 0"
                childMargin="0 1vmin 0 0"
            >
                <div className="weather">
                    <WeatherDisplay
                        cache={cache}
                        imperial={this.state.imperial}
                        city={this.state.city}
                        temp={this.state.temp}
                        tempF={this.state.tempF}
                        desc={this.state.desc}
                        icon={this.state.icon}
                        selected={this.state.selected}
                        forecast={this.state.forecast}
                        onChangeUnits={this.convertUnits}
                    />
                    <hr />
                    <div className="weather__forecast">
                        {this.state.forecast.map((forecast, index) => (
                            <WeatherButton
                                cache={cache}
                                key={forecast.key}
                                index={index}
                                forecast={forecast}
                                imperial={this.state.imperial}
                                onDayChange={this.handleDayChange}
                            />
                        ))}
                    </div>
                </div>
            </Hideable>
        );
    }
}

export default Weather;
