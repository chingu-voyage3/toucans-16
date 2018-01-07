import React from "react";
import Quote from "./Quote/Quote";
import Todo from "./Todo/Todo";
import Clock from "./Clock/Clock";
import Links from "./Links/Links";
import Sounds from "./Sounds/Sounds";
import Timer from "./Timer/Timer";
import Weather from "./Weather/Weather";
import "./App.css";

const App = () => (
    <div
        style={{
            background: `url(https://source.unsplash.com/featured/${
                window.screen.width
            }x${window.screen.height}) no-repeat center center fixed`,
            backgroundSize: "cover"
        }}
    >
        <Todo />
        <Clock />
        <Quote />
        <Links />
        <Sounds />
        <Timer />
        <Weather />
    </div>
);

export default App;
