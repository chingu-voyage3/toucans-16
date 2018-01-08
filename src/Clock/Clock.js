import React, { Component } from "react";
import "./clock.css";

class Clock extends Component {
    state = {
        time: new Date()
    };
    componentWillMount() {
        setInterval(() => this.currentTime(), 1000);
    }
    currentTime() {
        this.setState({
            time: new Date()
        });
    }
    render() {
        return (
            <h1 className="live-clock">
                {this.state.time.toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit"
                })}
            </h1>
        );
    }
}

export default Clock;
