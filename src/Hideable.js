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
        const btnStyle = {
            alignSelf: this.props.align,
            backgroundColor: "transparent",
            border: "0",
            color: "white",
            outline: "0",
            margin: this.props.margin
            // fontSize: "1.5vmin"
        };
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center"
                }}
            >
                {this.props.dir === "top" ? (
                    <button
                        className="hideable"
                        style={btnStyle}
                        onClick={this.handleClick}
                    >
                        <div style={{ opacity: "1" }}>{this.props.label}</div>
                    </button>
                ) : null}
                <div
                    style={{
                        /* visibility: this.state.hidden ? "hidden" : "visible", */
                        opacity: this.state.hidden ? "0" : "1",
                        WebkitTransition: "0.3s",
                        transition: "0.3s",
                        margin: this.props.childMargin
                    }}
                >
                    {this.props.children}
                </div>
                {this.props.dir === "bottom" ? (
                    <button
                        className="hideable"
                        style={btnStyle}
                        onClick={this.handleClick}
                    >
                        {this.props.label}
                    </button>
                ) : null}
            </div>
        );
    }
}

export default Hideable;
