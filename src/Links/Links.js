import React, { Component } from "react";
import _ from "lodash";
import Hideable from "../Hideable";
import LinksItem from "./LinksItem";
import LinksInput from "./LinksInput";
import "./links.css";

class Links extends Component {
    state = {
        items: [
            { id: _.uniqueId(), name: "Github", url: "https://www.github.com" },
            { id: _.uniqueId(), name: "Reddit", url: "https://www.reddit.com" }
        ]
    };
    handleAdd = (name, url) => {
        this.setState({
            items: [
                ...this.state.items,
                {
                    id: _.uniqueId(),
                    name,
                    url
                }
            ]
        });
    };
    handleDelete = id => {
        this.setState({
            items: this.state.items.filter(item => id !== item.id)
        });
    };
    handleDragDrop = (id1, id2) => {
        const idx1 = this.state.items.findIndex(item => item.id === id1);
        const idx2 = this.state.items.findIndex(item => item.id === id2);
        this.setState({
            items: this.state.items.map(item => {
                if (item.id === id1) return this.state.items[idx2];
                if (item.id === id2) return this.state.items[idx1];
                return item;
            })
        });
    };
    render() {
        return (
            <Hideable label="link">
                <ul>
                    {this.state.items.map(link => (
                        <LinksItem
                            id={link.id}
                            key={link.id}
                            name={link.name}
                            url={link.url}
                            draggable="true"
                            onHandleDelete={this.handleDelete}
                            onDragStart={this.handleDragStart}
                            onDragOver={this.handleDragOver}
                            onDrop={this.handleDragDrop}
                        />
                    ))}
                </ul>
                <LinksInput onHandleAdd={this.handleAdd} />
            </Hideable>
        );
    }
}

export default Links;
