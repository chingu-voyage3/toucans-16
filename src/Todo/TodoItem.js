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
    handleEdit = () => {
        if (!this.props.completed) {
            setTimeout(() => {
                const selection = window.getSelection();
                const range = document.createRange();
                selection.removeAllRanges();
                range.selectNodeContents(this.textarea);
                range.collapse(false);
                selection.addRange(range);
                this.textarea.focus();
            }, 0);
            this.props.onEdit(this.props.id);
        }
    };
    handleBlur = () => this.props.onBlur(this.props.id);
    render() {
        return (
            <li
                className="todo__item"
                draggable="true"
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDrop={this.handleDrop}
            >
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <input
                        type="checkbox"
                        checked={this.props.completed}
                        onChange={this.toggleCompleted}
                        style={{ height: "20px" }}
                    />

                    <div
                        ref={textarea => {
                            this.textarea = textarea;
                        }}
                        contentEditable={this.props.editing}
                        className="todo__text"
                        onDoubleClick={this.handleEdit}
                        onBlur={this.handleBlur}
                        suppressContentEditableWarning="true"
                        style={{
                            color: this.props.completed ? "#363636" : "white",
                            outline: "0px solid transparent",
                            textDecoration: this.props.completed
                                ? "line-through"
                                : "none"
                        }}
                    >
                        {this.props.value}
                    </div>
                </div>
                <button className="todo__delete" onClick={this.handleDelete}>
                    x
                </button>
            </li>
        );
    }
}

export default TodoItem;
