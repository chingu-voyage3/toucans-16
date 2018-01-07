import React, { Component } from "react";

class TimerItem extends Component {
    handleName = event =>
        this.props.onHandleName(this.props.timer.id, event.target.value);
    handleSeconds = event => {
        this.props.onHandleSeconds(this.props.timer.id, event.target.value);
    };
    handleMinutes = event => {
        this.props.onHandleMinutes(this.props.timer.id, event.target.value);
    };
    handleHours = event => {
        this.props.onHandleHours(this.props.timer.id, event.target.value);
    };
    handleAdd = event => {
        event.preventDefault();
        const timer = {
            name: this.props.timer.name,
            hrs: this.props.timer.hrs,
            mins: this.props.timer.mins,
            secs: this.props.timer.secs
        };
        this.props.onHandleAdd(timer);
    };
    handleDelete = event => {
        event.preventDefault();
        this.props.onHandleDelete(this.props.timer.id);
    };
    render() {
        return (
            <div
                style={{
                    color: this.props.highlight ? "red" : "black"
                }}
            >
                <input
                    type="text"
                    placeholder="Period Name"
                    value={this.props.timer.name}
                    onChange={this.handleName}
                />
                <span>
                    <input
                        type="text"
                        placeholder="00"
                        value={this.props.timer.hrs}
                        onChange={this.handleHours}
                    />
                    H:
                </span>
                <span>
                    <input
                        type="text"
                        placeholder="00"
                        value={this.props.timer.mins}
                        onChange={this.handleMinutes}
                    />
                    M:
                </span>
                <span>
                    <input
                        type="text"
                        placeholder="00"
                        value={this.props.timer.secs}
                        onChange={this.handleSeconds}
                    />
                    S
                </span>
                {this.props.set ? (
                    <button onClick={this.handleDelete}>-</button>
                ) : (
                    <button onClick={this.handleAdd}>+</button>
                )}
            </div>
        );
    }
}

export default TimerItem;
