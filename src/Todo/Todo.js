import React, { Component } from "react";
import TodoList from "./TodoList";

class Todo extends Component {
    state = {
        visible: true
    };
    handleVisible = () => {
        this.setState({ visible: !this.state.visible });
    };
    render() {
        return (
            <div className="todo-container">
                <TodoList visible={this.state.visible} />
                <button className="todo-button" onClick={this.handleVisible}>
                    Todo
                </button>
            </div>
        );
    }
}

export default Todo;
