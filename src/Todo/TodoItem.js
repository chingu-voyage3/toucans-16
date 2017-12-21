import React, { Component } from "react";
import "./todo.css";

class TodoItem extends Component {
    toggleCompleted = () => {
        this.props.onCompleted(this.props.id);
    };
    handleDelete = () => {
        this.props.onDeleteTodo(this.props.id);
    };
    handleDragStart = evt => {
        evt.dataTransfer.setData("text", this.props.id);
    };
    handleDragOver = evt => evt.preventDefault();
    handleDrop = evt => {
        evt.preventDefault();
        this.props.onDrop(evt.dataTransfer.getData("text"), this.props.id);
    };
    render() {
        return (
            <li
                className="todo-item"
                draggable="true"
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDrop={this.handleDrop}
            >
                <input
                    type="checkbox"
                    checked={this.props.completed}
                    onChange={this.toggleCompleted}
                />
                <p
                    className="todo-text"
                    style={{
                        textDecoration: this.props.completed
                            ? "line-through"
                            : "none"
                    }}
                >
                    {this.props.value}
                </p>
                <button className="todo-delete" onClick={this.handleDelete}>
                    x
                </button>
            </li>
        );
    }
}

export default TodoItem;
