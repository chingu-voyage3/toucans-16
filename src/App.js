import React, { Component } from "react";
import Quote from "./Quote/Quote";
import Todo from "./Todo/Todo";
import Clock from "./Clock/Clock";
import Links from "./Links/Links";
import Sounds from "./Sounds/Sounds";
import Timer from "./Timer/Timer";
import Weather from "./Weather/Weather";
import "./App.css";

class App extends Component {
    state = { name: localStorage.getItem("name") };
    handleKeyUp = event => {
        if (event.key === "Enter" && event.target.value.length) {
            this.setState({ name: event.target.value });
            localStorage.setItem("name", event.target.value);
        }
    };
    render() {
        return (
            <div
                style={{
                    background: `url(https://source.unsplash.com/featured/${
                        window.screen.width
                    }x${window.screen.height}) center center no-repeat fixed`,
                    backgroundSize: "cover",
                    height: "100vh",
                    width: "100vw"
                }}
            >
                {this.state.name === null ? (
                    <div className="app__name">
                        <h1>Hello, what is your name?</h1>
                        <input
                            style={{ textAlign: "center" }}
                            className="app__input"
                            type="text"
                            onKeyUp={this.handleKeyUp}
                        />
                    </div>
                ) : (
                    <div className="container">
                        <div className="container__todo">
                            <Todo />
                        </div>
                        <div className="container__clock">
                            <Clock name={this.state.name} />
                        </div>
                        <div className="container__quote">
                            <Quote />
                        </div>
                        <div className="container__links">
                            <Links />
                        </div>
                        <div className="container__sounds">
                            <Sounds />
                        </div>
                        <div className="container__timer">
                            <Timer />
                        </div>
                        <div className="container__weather">
                            <Weather />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default App;
