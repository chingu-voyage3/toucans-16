import React from "react";
import Quote from "./Quote";
import Todo from "./Todo/Todo";
import Links from "./Links/Links";
import Sounds from "./Sounds/Sounds";

const App = () => (
    <div>
        <Todo />
        <Quote />
        <Links />
        <Sounds />
    </div>
);

export default App;
