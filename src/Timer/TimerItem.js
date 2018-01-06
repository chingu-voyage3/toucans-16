import React, { Component } from "react";

class TimerItem extends Component {
    handleSeconds = event => {
        this.props.onSecondsChange(this.props.timer.id, event.target.value);
    };
    handleMinutes = event => {
        this.props.onMinutesChange(this.props.timer.id, event.target.value);
    };
    handleHours = event => {
        this.props.onHoursChange(this.props.timer.id, event.target.value);
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
    handleName = event =>
        this.props.onHandleName(this.props.timer.id, event.target.value);
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
