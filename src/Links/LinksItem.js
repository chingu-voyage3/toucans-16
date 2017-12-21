import React, { Component } from "react";

class LinksItem extends Component {
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
                draggable="true"
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDrop={this.handleDrop}
            >
                <img alt="" />
                <a href={this.props.link}>{this.props.name}</a>
                <button onClick={this.handleDelete}>x</button>
            </li>
        );
    }
}

export default LinksItem;
