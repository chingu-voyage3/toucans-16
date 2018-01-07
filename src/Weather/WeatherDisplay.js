import React from "react";

const WeatherDisplay = props =>
    props.selected === 0 ? (
        <div>
            <h2>{props.city}</h2>
            <h3>{props.desc}</h3>
            <div>
                <img src={props.cache[props.icon]} alt="weather-icon" />
                <h1>{props.temp}&#176;</h1>
            </div>
        </div>
    ) : (
        <div>
            <h2>
                <span>{props.city}</span>
                <span>{props.forecast[props.selected].day}</span>
            </h2>
            <h3>{props.desc}</h3>
            <img src={props.cache[props.icon]} alt="weather-icon" />
            <h1>
                <span>{props.forecast[props.selected].max}&#176;</span>
                <span>{props.forecast[props.selected].min}&#176;</span>
            </h1>
        </div>
    );
export default WeatherDisplay;
