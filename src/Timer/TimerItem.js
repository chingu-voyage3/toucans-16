import React, { Component } from "react";
import "./Timer.css";

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
        this.props.onHandleDelete(this.props.timer.id, this.props.idx);
    };
    render() {
        return (
            <div
                className="timer__item"
                style={{
                    color: this.props.highlight ? "red" : "white"
                }}
            >
                <input
                    type="text"
                    className="timer__item__name"
                    placeholder="Period Name"
                    value={this.props.timer.name}
                    onChange={this.handleName}
                />
                <input
                    type="text"
                    className="timer__item__number"
                    placeholder="00"
                    value={this.props.timer.hrs}
                    onChange={this.handleHours}
                />
                <pre>H: </pre>
                <input
                    type="text"
                    className="timer__item__number"
                    placeholder="00"
                    value={this.props.timer.mins}
                    onChange={this.handleMinutes}
                />
                <pre>M: </pre>
                <input
                    type="text"
                    className="timer__item__number"
                    placeholder="00"
                    value={this.props.timer.secs}
                    onChange={this.handleSeconds}
                />
                <pre>S </pre>

                {this.props.set ? (
                    <button
                        className="timer__item__btn"
                        onClick={this.handleDelete}
                    >
                        -
                    </button>
                ) : (
                    <button
                        className="timer__item__btn"
                        onClick={this.handleAdd}
                    >
                        +
                    </button>
                )}
            </div>
        );
    }
}

export default TimerItem;
