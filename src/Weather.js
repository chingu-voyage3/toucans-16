import React from "react";
import axios from "axios";

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            temp: "",
            des: "",
            ico: "",
            apiRequest: "https://fcc-weather-api.glitch.me/api/current?"
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(pos => {
            this.setState({
                apiRequest: `${this.state.apiRequest}lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
            })
            axios.get(this.state.apiRequest).then(response => {
                const weatherInfo = response.data;
                this.setState({
                    name: weatherInfo.name,
                    temp: weatherInfo.main.temp,
                    des: weatherInfo.weather[0].description,
                    ico: weatherInfo.weather[0].icon,
                    celsius: weatherInfo.main.temp
                });
            });
        });
    }

    Click = () => {
        const fahrenheit = this.state.celsius * (9 / 5) + 32;
        if (this.state.temp < fahrenheit) {
            this.setState({
                temp: fahrenheit
            });
        } else {
            this.setState({
                temp: this.state.celsius
            });
        }
    };

    render() {
        return (
            <div>
                <div>Current Location: {this.state.name}</div>
                <div>Current Temperature: {this.state.temp}</div>
                <div>{this.state.des}</div>
                <div>
                    <img
                        src={this.state.ico}
                        alt="Description of the Weather"
                    />
                </div>
                <button onClick={this.Click}>Toggle Settings</button>
            </div>
        );
    }
}

export default Weather;
