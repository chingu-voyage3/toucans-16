import React from "react";
import "./weather.css";

const WeatherDisplay = props => {
    let current = null;
    if (props.selected === 0) {
        current = (
            <div className="weather__display__info">
                <img src={props.cache[props.icon]} alt="weather-icon" />
                <div className="weather__display__content">
                    <h2 className="weather__display__temp">
                        {props.imperial ? props.tempF : props.temp}&#176;
                    </h2>
                </div>
            </div>
        );
    } else if (props.forecast.length > 0) {
        current = (
            <div className="weather__display__info">
                <img
                    src={props.cache[props.forecast[props.selected].icon]}
                    alt="weather-icon"
                />
                {props.imperial ? (
                    <div className="weather__display__content">
                        <h2 className="weather__display__temp">
                            {props.forecast[props.selected].maxF}&#176;
                        </h2>
                        <h3 className="weather__display__low">
                            {props.forecast[props.selected].minF}&#176;
                        </h3>
                    </div>
                ) : (
                    <div className="weather__display__content">
                        <h2 className="weather__display__temp">
                            {props.forecast[props.selected].max}&#176;
                        </h2>
                        <h3 className="weather__display__low">
                            {props.forecast[props.selected].min}&#176;
                        </h3>
                    </div>
                )}
            </div>
        );
    }
    return (
        <div className="weather__display">
            <div className="weather__display__header">
                <div className="weather__display__content">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <h2>{props.city}</h2>
                        {props.selected === 0 ? null : (
                            <h4 className="weather__display__day">
                                {props.forecast[props.selected].day}
                            </h4>
                        )}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <pre>&#176;C|&#176;F </pre>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={props.checked}
                                onChange={props.onChangeUnits}
                            />
                            <span className="slider round" />
                        </label>
                    </div>
                </div>
                <h3>{props.desc}</h3>
            </div>
            {current}
        </div>
    );
};
export default WeatherDisplay;
