import React from "react";
import Quote from "./Quote";
import Todo from "./Todo/Todo";
import Links from "./Links/Links";
import Sounds from "./Sounds/Sounds";
import Timer from "./Timer/Timer";

const App = () => (
    <div>
        <Todo />
        <Quote />
        <Links />
        <Sounds />
        <Timer />
    </div>
);

export default App;
