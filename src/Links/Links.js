import React, { Component } from "react";
import _ from "lodash";
import Hideable from "../Hideable";
import LinksItem from "./LinksItem";
import LinksInput from "./LinksInput";
import "./links.css";

class Links extends Component {
    state = {
        links: []
    };
    handleAdd = (name, url) => {
        this.setState({
            links: [
                ...this.state.links,
                {
                    id: _.uniqueId(),
                    name,
                    url,
                    fixed: false
                }
            ]
        });
    };
    handleDelete = id => {
        this.setState({
            links: this.state.links.filter(link => id !== link.id)
        });
    };
    handleDragDrop = (id1, id2) => {
        const idx1 = this.state.links.findIndex(link => link.id === id1);
        const idx2 = this.state.links.findIndex(link => link.id === id2);
        this.setState({
            links: this.state.links.map(link => {
                if (link.id === id1) return this.state.links[idx2];
                if (link.id === id2) return this.state.links[idx1];
                return link;
            })
        });
    };
    render() {
        return (
            <Hideable label="Links" dir="top" align="flex-start">
                <ul className="links-container">
                    {this.state.links.map(link => (
                        <LinksItem
                            id={link.id}
                            key={link.id}
                            name={link.name}
                            url={link.url}
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
