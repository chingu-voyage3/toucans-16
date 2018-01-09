import React, { Component } from "react";

class Hideable extends Component {
    state = {
        hidden: true
    };
    handleClick = e => {
        e.preventDefault();
        this.setState({
            hidden: !this.state.hidden
        });
    };
    /* handleBlur = () => {
        setTimeout(() => {
            if (this.state.focus)
                this.setState({
                    focus: false
                });
        }, 0);
    };
    handleFocus = () => {
        if (!this.state.focus)
            this.setState({
                focus: true
            });
    }; */
    render() {
        return (
            <div style={{ textAlign: "center" }}>
                {this.props.dir === "top" ? (
                    <button onClick={this.handleClick}>
                        {this.props.label}
                    </button>
                ) : null}
                <div
                    style={{
                        visibility: this.state.hidden ? "hidden" : "visible"
                    }}
                >
                    {this.props.children}
                </div>
                {this.props.dir === "bottom" ? (
                    <button onClick={this.handleClick}>
                        {this.props.label}
                    </button>
                ) : null}
            </div>
        );
    }
}

export default Hideable;
