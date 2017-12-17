import React, { Component } from "react";

class TodoButton extends Component {
    handleVisible = () => {
        this.props.onToggleVisible();
    };
    render() {
        return (
            <button className="todo-button" onClick={this.handleVisible}>
                Todo
            </button>
        );
    }
}

export default TodoButton;
