import React, { Component } from "react";

class Hideable extends Component {
    state = {
        hidden: true
    };
    handleClick = () => {
        this.setState({
            hidden: !this.state.hidden
        });
    };
    render() {
        return (
            <div>
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
