import React, { Component } from "react";
import "./weather.css";

class WeatherButton extends Component {
    handleDayChange = event => {
        event.preventDefault();
        this.props.onDayChange(this.props.index);
    };
    render = () => (
        <button className="weather__button" onClick={this.handleDayChange}>
            <h4>{this.props.forecast.day.substring(0, 3)}</h4>
            <div className="weather__button__content">
                <img
                    className="weather__button__icon"
                    src={this.props.cache[this.props.forecast.icon]}
                    alt="weather-icon"
                />
                {this.props.imperial ? (
                    <div className="weather__button__font">
                        {this.props.forecast.maxF}&#176;{" "}
                        {this.props.forecast.minF}&#176;
                    </div>
                ) : (
                    <div className="weather__button__font">
                        {this.props.forecast.max}&#176;{" "}
                        {this.props.forecast.min}&#176;
                    </div>
                )}
            </div>
        </button>
    );
}

export default WeatherButton;
