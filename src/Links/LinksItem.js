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
                className="links__item"
                draggable="true"
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDrop={this.handleDrop}
            >
                <div className="links__item__link">
                    <img
                        src={`https://grabicon.com/icon?domain=${
                            this.props.url
                        }`}
                        alt={`${this.props.name} icon`}
                    />
                    <a href={this.props.url} target="_blank">
                        {this.props.name}
                    </a>
                </div>
                <button
                    className="links__item__delete"
                    onClick={this.handleDelete}
                >
                    x
                </button>
            </li>
        );
    }
}

export default LinksItem;
