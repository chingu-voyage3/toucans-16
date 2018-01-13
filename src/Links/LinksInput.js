import React, { Component } from "react";

class LinksInput extends Component {
    state = {
        clicked: false,
        name: "",
        url: ""
    };
    handleTextChange = event => this.setState({ value: [event.target.value] });
    handleKeyUp = event => {
        if (event.key === "Enter" && this.state.value.length) {
            this.props.onNewTodo(event.target.value);
            this.setState({ value: "" });
        }
    };
    handleClick = event => {
        event.preventDefault();
        this.setState({
            clicked: true
        });
    };
    handleNameChange = event => this.setState({ name: [event.target.value] });
    handleURLChange = event => this.setState({ url: [event.target.value] });
    handleKeyUp = event => {
        if (
            event.key === "Enter" &&
            this.state.name.length &&
            this.state.url.length
        ) {
            let link = this.state.url;
            if (!link.toString().startsWith("https://"))
                link = "https://".concat(link);
            this.props.onHandleAdd(this.state.name, link);
            this.handleClose();
        }
    };
    handleClose = () => this.setState({ clicked: false, name: "", url: "" });
    render() {
        return this.state.clicked ? (
            <div>
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        className="input-name"
                        value={this.state.name}
                        onChange={this.handleNameChange}
                        onKeyUp={this.handleKeyUp}
                        autoFocus
                    />
                    <button onClick={this.handleClose} className="cancel-link">x</button>
                </div>
                <input
                    type="text"
                    placeholder="URL"
                    className="url-name"
                    value={this.state.url}
                    onChange={this.handleURLChange}
                    onKeyUp={this.handleKeyUp}
                />
            </div>
        ) : (
            <a href="" onClick={this.handleClick} className="new-link">
                New Link
            </a>
        );
    }
}
export default LinksInput;
