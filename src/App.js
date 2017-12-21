import React from "react";
import Quote from "./Quote/Quote";
import Todo from "./Todo/Todo";
import Clock from "./Clock/Clock";

const App = () => (
    <div>
        <Todo />
        <Clock />
        <Quote />
    </div>
);

export default App;
