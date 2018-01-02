import React, { Component } from "react";

class LinksItem extends Component {
    handleDragStart = evt => {
        evt.dataTransfer.setData("text", this.props.id);
    };
    handleDragOver = evt => evt.preventDefault();
    handleDrop = evt => {
        evt.preventDefault();
        this.props.onDrop(evt.dataTransfer.getData("text"), this.props.id);
    };
    handleDelete = () => this.props.onHandleDelete(this.props.id);
    render() {
        return (
            <li
                id={this.props.id}
                className="links-item"
                draggable="true"
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDrop={this.handleDrop}
            >
                <img
                    src={`http://grabicon.com/icon?domain=${this.props.url}`}
                    alt={`${this.props.name} icon`}
                />
                <a href={this.props.url} target="_blank">
                    {this.props.name}
                </a>
                <button onClick={this.handleDelete}>x</button>
            </li>
        );
    }
}

export default LinksItem;
