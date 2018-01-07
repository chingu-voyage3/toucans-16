import React, { Component } from "react";

class WeatherButton extends Component {
    handleDayChange = event => {
        event.preventDefault();
        this.props.onDayChange(this.props.index);
    };
    render() {
        return (
            <button onClick={this.handleDayChange}>
                <h4>{this.props.forecast.day.substring(0, 3)}</h4>
                <div>
                    <img
                        src={this.props.cache[this.props.forecast.icon]}
                        alt="weather-icon"
                    />
                    {this.props.forecast.max}&#176; {this.props.forecast.min}&#176;
                </div>
            </button>
        );
    }
}

export default WeatherButton;
