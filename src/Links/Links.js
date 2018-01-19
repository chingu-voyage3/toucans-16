import React, { Component } from "react";
import _ from "lodash";
import Hideable from "../Hideable";
import LinksItem from "./LinksItem";
import LinksInput from "./LinksInput";
import "./Links.css";

class Links extends Component {
    state = {
        links: []
    };
    componentDidMount() {
        window.addEventListener("beforeunload", this.onUnload);
        this.loadSavedData();
    }
    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload);
    }
    onUnload = () => {
        localStorage.setItem("links", JSON.stringify(this.state.links));
    };
    loadSavedData = () => {
        const links = JSON.parse(localStorage.getItem("links")) || [];
        for (let i = 0; i < links.length; i += 1) {
            links[i].id = _.uniqueId();
        }
        this.setState({
            links
        });
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
            <Hideable
                label="Links"
                dir="top"
                align="flex-start"
                margin="1.5vmin 0 1vmin 2vmin"
                childMargin="0 0 0 1vmin"
            >
                <div className="links">
                    <ul className="links__list">
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
                    {this.state.links.length > 0 ? <hr /> : null}
                    <LinksInput onHandleAdd={this.handleAdd} />
                </div>
            </Hideable>
        );
    }
}

export default Links;
