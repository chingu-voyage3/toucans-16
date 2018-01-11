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
                className="todo__item"
                draggable="true"
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDrop={this.handleDrop}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                        type="checkbox"
                        checked={this.props.completed}
                        onChange={this.toggleCompleted}
                    />
                    <p
                        className="todo__text"
                        style={{
                            textDecoration: this.props.completed
                                ? "line-through"
                                : "none"
                        }}
                    >
                        {this.props.value}
                    </p>
                </div>
                <button className="todo__delete" onClick={this.handleDelete}>
                    x
                </button>
            </li>
        );
    }
}

export default TodoItem;
