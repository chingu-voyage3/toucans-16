import React, { Component } from "react";
import _ from "lodash";
import LinksItem from "./LinksItem";
import LinksInput from "./LinksInput";

class LinksList extends Component {
    state = {
        links: []
    };
    handleNewTodo = (name, link) => {
        if (name && link) {
            this.setState({
                links: [
                    ...this.state.links,
                    {
                        name,
                        link,
                        deleted: false,
                        id: _.uniqueId()
                    }
                ]
            });
        }
    };
    handleDeleteTodo = id => {
        this.setState({
            links: this.state.links.filter(link => id !== link.id)
        });
    };
    handleDrop = (id1, id2) => {
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
    allowDrop = evt => evt.preventDefault();
    handleCompleted = id => {
        this.setState({
            links: this.state.links.map(link => {
                if (link.id === id)
                    return {
                        name: link.name,
                        id: link.id,
                        link: link.link,
                        deleted: link.deleted
                    };
                return link;
            })
        });
    };
    render() {
        return (
            <div
                onDragOver={this.allowDrop}
                style={{
                    visibility: this.props.visible ? "visible" : "hidden"
                }}
            >
                <h4>{this.state.links.length} to do</h4>
                <ul>
                    {this.state.links.map(link => (
                        <LinksItem
                            id={link.id}
                            key={link.id}
                            name={link.name}
                            onDeleteTodo={this.handleDeleteTodo}
                            onDrop={this.handleDrop}
                            onCompleted={this.handleCompleted}
                        />
                    ))}
                </ul>
                <LinksInput onNewTodo={this.handleNewTodo} />
            </div>
        );
    }
}

export default LinksList;
