import React, { Component } from "react";

class LinksInput extends Component {
    state = {
        value: ""
    };
    handleTextChange = event => this.setState({ value: [event.target.value] });
    handleKeyUp = event => {
        if (event.key === "Enter" && this.state.value.length) {
            this.props.onNewTodo(event.target.value);
            this.setState({ value: "" });
        }
    };
    render() {
        return (
            <input
                type="text"
                placeholder="New Todo"
                value={this.state.value}
                onChange={this.handleTextChange}
                onKeyUp={this.handleKeyUp}
            />
        );
    }
}
export default LinksInput;
