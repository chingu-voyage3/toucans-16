import React, { Component } from "react";
import "./clock.css";

class Clock extends Component {
    state = {
        time: new Date(),
        name: localStorage.getItem("name"),
        greet: ""
    };
    componentWillMount() {
        setInterval(() => this.currentTime(), 1000);
    }
    currentTime() {
        const hour = this.state.time.getTime();
        let greet;
        if (hour < 12) greet = "morning";
        else if (hour < 17) greet = "afternoon";
        else greet = "evening";
        this.setState({
            time: new Date(),
            greet
        });
    }
    render() {
        return (
            <div>
                <h1 className="clock">
                    {this.state.time.toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit"
                    })}
                </h1>
                <h2 className="greeting">{`Good ${this.state.greet}, ${
                    this.state.name
                }.`}</h2>
            </div>
        );
    }
}

export default Clock;
