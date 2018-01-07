import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import WeatherDisplay from "./WeatherDisplay";
import WeatherButton from "./WeatherButton";
import Hideable from "../Hideable";

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
                        "Thursday",
                        "Friday",
                        "Saturday"
                    ];
                    let dayNum = date.getDate();
                    for (let i = 0; i < 5; i += 1) {
                        forecast.push({
                            day: week[date.getDay()],
                            min: Math.round(fore.data.data[i].min_temp),
                            max: Math.round(fore.data.data[i].max_temp),
                            icon: fore.data.data[i].weather.icon,
                            desc: fore.data.data[i].weather.description,
                            key: _.uniqueId()
                        });
                        dayNum += 1;
                        date.setDate(dayNum);
                    }
                    this.setState({
                        city: curr.data.data[0].city_name,
                        temp: Math.round(curr.data.data[0].temp),
                        desc: curr.data.data[0].weather.description,
                        icon: curr.data.data[0].weather.icon,
                        forecast
                    });
                })
            );
        });
    };
    handleDayChange = index => {
        this.setState({
            selected: index
        });
    };
    render() {
        return (
            <Hideable label="Weather" dir="top">
                <WeatherDisplay
                    cache={cache}
                    city={this.state.city}
                    temp={this.state.temp}
                    desc={this.state.desc}
                    icon={this.state.icon}
                    selected={this.state.selected}
                    forecast={this.state.forecast}
                />
                {this.state.forecast.map((forecast, index) => (
                    <WeatherButton
                        cache={cache}
                        key={forecast.key}
                        index={index}
                        forecast={forecast}
                        onDayChange={this.handleDayChange}
                    />
                ))}
            </Hideable>
        );
    }
}

export default Weather;
