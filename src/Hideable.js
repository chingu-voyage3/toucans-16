import React, { Component } from "react";

class Hideable extends Component {
    state = {
        hidden: false
    };
    handleClick = () => {
        this.setState({
            hidden: !this.state.hidden
        });
    };
    render() {
        return (
            <div>
                <div
                    style={{
                        visibility: this.state.hidden ? "hidden" : "visible"
                    }}
                >
                    {this.props.children}
                </div>
                <button onClick={this.handleClick}>{this.props.label}</button>
            </div>
        );
    }
}

export default Hideable;
