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
            this.setState({
                name: "",
                url: ""
            });
            this.nameInput.focus();
        }
    };
    handleClose = () => this.setState({ clicked: false, name: "", url: "" });
    render() {
        return this.state.clicked ? (
            <div className="links__input">
                <div>
                    <input
                        ref={name => {
                            this.nameInput = name;
                        }}
                        type="text"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.handleNameChange}
                        onKeyUp={this.handleKeyUp}
                        autoFocus
                        maxLength="20"
                    />
                    <input
                        ref={url => {
                            this.urlInput = url;
                        }}
                        type="text"
                        placeholder="URL"
                        value={this.state.url}
                        onChange={this.handleURLChange}
                        onKeyUp={this.handleKeyUp}
                    />
                </div>
                <button
                    className="links__input__delete"
                    onClick={this.handleClose}
                    tabIndex="-1"
                >
                    x
                </button>
            </div>
        ) : (
            <a href="" className="links__input__new" onClick={this.handleClick}>
                New Link
            </a>
        );
    }
}
export default LinksInput;
