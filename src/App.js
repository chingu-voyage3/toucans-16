import React from "react";
import Quote from "./Quote/Quote";
import Todo from "./Todo/Todo";
import Clock from "./Clock/Clock";
import Links from "./Links/Links";
import Sounds from "./Sounds/Sounds";
import Timer from "./Timer/Timer";
import Weather from "./Weather/Weather";
import "./app.css";

const App = () => (
    <div
        className="container"
        style={{
            background: `url(https://source.unsplash.com/featured/${
                window.screen.width
            }x${window.screen.height}) center center cover no-repeat fixed`
        }}
    >
        <div className="container__todo">
            <Todo />
        </div>
        <div className="container__clock">
            <Clock />
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
);

export default App;
