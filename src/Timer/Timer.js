import React, { Component } from "react";
import _ from "lodash";
import TimerItem from "./TimerItem";
import Worker from "./timer.worker";
import Hideable from "../Hideable";
import ring from "./Ting-sound-effect.mp3";
import "./timer.css";

class Timer extends Component {
    state = {
        timers: JSON.parse(localStorage.getItem("timers")) || [],
        currIdx: 1,
        running: false,
        currTime: 0,
        repeat: false,
        ringing: false,
        alarm: new Audio(ring)
    };
    componentWillMount() {
        this.worker = new Worker();
        this.worker.addEventListener("message", () => {
            this.handleWorker();
        });
        if (this.state.timers.length === 0)
            this.setState({
                timers: [
                    {
                        name: "",
                        secs: "",
                        mins: "",
                        hrs: "",
                        id: _.uniqueId()
                    }
                ]
            });
        this.state.alarm.volume = 1;
        this.state.alarm.playbackRate = 2;
    }
    componentDidMount() {
        window.addEventListener("beforeunload", this.onUnload);
    }
    componentWillUnmount() {
        this.worker.terminate();
        window.removeEventListener("beforeunload", this.onUnload);
    }
    onUnload = () => {
        localStorage.setItem("timers", JSON.stringify(this.state.timers));
    };
    getSeconds = (secs, mins, hrs) => {
        const s = parseInt(secs, 10) || 0;
        const m = parseInt(mins, 10) || 0;
        const h = parseInt(hrs, 10) || 0;
        return s + m + h === 0 && this.state.timers.length > 0
            ? 25 * 60
            : s + m * 60 + h * 3600;
    };
    handleAdd = timer => {
        const check = /^[0-9]+$/;
        if (
            (timer.secs !== "" && check.test(timer.secs)) ||
            (timer.mins !== "" && check.test(timer.mins)) ||
            (timer.hrs !== "" && check.test(timer.hrs)) ||
            (timer.secs === "" && timer.mins === "" && timer.hrs === "")
        ) {
            const newTimers = this.state.timers.map((obj, index) => {
                if (index === 0) {
                    return {
                        name: "",
                        secs: "",
                        mins: "",
                        hrs: "",
                        id: obj.id
                    };
                }
                return obj;
            });
            this.setState({
                timers: [
                    ...newTimers,
                    {
                        name:
                            timer.name === "" && this.state.timers.length > 0
                                ? `Period ${this.state.timers.length}`
                                : timer.name,
                        secs: timer.secs,
                        mins:
                            timer.secs === "" &&
                            timer.mins === "" &&
                            timer.hrs === "" &&
                            this.state.timers.length > 0
                                ? "25"
                                : timer.mins,
                        hrs: timer.hrs,
                        id: _.uniqueId()
                    }
                ]
            });
        }
    };
    handleDelete = id => {
        this.setState({
            timers: this.state.timers.filter(timer => timer.id !== id)
        });
    };
    handleClear = event => {
        event.preventDefault();
        this.setState({
            timers: [
                { name: "", hrs: "", mins: "", secs: "", id: _.uniqueId() }
            ]
        });
    };
    handleStart = event => {
        event.preventDefault();
        if (this.state.timers.length > 1) {
            const idx = this.state.currIdx;
            const timer = this.state.timers[idx];
            const time = this.getSeconds(timer.secs, timer.mins, timer.hrs);
            this.worker.postMessage("start");
            this.setState({
                running: true,
                currTime: this.state.currTime === 0 ? time : this.state.currTime
            });
        }
    };
    handlePause = event => {
        event.preventDefault();
        this.worker.postMessage("pause");
        this.setState({
            running: false
        });
    };
    handleWorker = () => {
        let idx = this.state.currIdx;
        let running = this.state.running;
        let time = this.state.currTime;
        let ringing = false;

        if (running) {
            time -= 1;
            if (time === 0 && idx === this.state.timers.length - 1)
                this.state.alarm.play();
            if (time < 0) {
                idx += 1;
                if (idx === this.state.timers.length) {
                    if (!this.state.repeat) {
                        this.worker.postMessage("pause");
                        running = false;
                    }
                    ringing = true;
                    setTimeout(() => {
                        this.setState({
                            ringing: false
                        });
                    }, 0);
                    idx = 1;
                }
                const timer = this.state.timers[idx];
                time = this.getSeconds(timer.secs, timer.mins, timer.hrs);
            }
            this.setState({
                currIdx: idx,
                currTime: time,
                running,
                ringing
            });
        }
    };
    handleSecondsChange = (id, seconds) => {
        this.setState({
            timers: this.state.timers.map(timer => {
                if (id === timer.id) {
                    return {
                        name: timer.name,
                        secs: seconds > 59 ? 59 : seconds,
                        mins: timer.mins,
                        hrs: timer.hrs,
                        id: timer.id
                    };
                }
                return timer;
            })
        });
    };
    handleMinutesChange = (id, minutes) => {
        this.setState({
            timers: this.state.timers.map(timer => {
                if (id === timer.id) {
                    return {
                        name: timer.name,
                        secs: timer.secs,
                        mins: minutes > 59 ? 59 : minutes,
                        hrs: timer.hrs,
                        id: timer.id
                    };
                }
                return timer;
            })
        });
    };
    handleHoursChange = (id, hours) => {
        this.setState({
            timers: this.state.timers.map(timer => {
                if (id === timer.id) {
                    return {
                        name: timer.name,
                        secs: timer.secs,
                        mins: timer.mins,
                        hrs: hours > 23 ? 23 : hours,
                        id: timer.id
                    };
                }
                return timer;
            })
        });
    };
    handleName = (id, name) => {
        this.setState({
            timers: this.state.timers.map(timer => {
                if (id === timer.id) {
                    return {
                        name,
                        secs: timer.secs,
                        mins: timer.mins,
                        hrs: timer.hrs,
                        id: timer.id
                    };
                }
                return timer;
            })
        });
    };
    toggleRepeat = () => {
        this.setState({
            repeat: !this.state.repeat
        });
    };
    render() {
        let display;
        const hours = Math.trunc(this.state.currTime / 3600) || 0;
        const minutes =
            Math.trunc((this.state.currTime - hours * 60) / 60) || 0;
        const seconds =
            Math.trunc(this.state.currTime - (hours * 3600 + minutes * 60)) %
                60 || 0;
        if (this.state.running) {
            display = (
                <div className="timer__display">
                    <h1>
                        {`${hours
                            .toString()
                            .padStart(2, "0")}:${minutes
                            .toString()
                            .padStart(2, "0")}:${seconds
                            .toString()
                            .padStart(2, "0")}`}
                    </h1>
                    <button onClick={this.handlePause}>PAUSE</button>
                </div>
            );
        } else {
            display = (
                <div className="timer">
                    <h2>Custom Timer</h2>
                    <div className="timer__list">
                        {this.state.timers.map((timer, index) => (
                            <TimerItem
                                key={timer.id}
                                timer={timer}
                                highlight={this.state.currIdx === index}
                                set={index !== 0}
                                onHandleAdd={this.handleAdd}
                                onHandleDelete={this.handleDelete}
                                onHandleName={this.handleName}
                                onHandleSeconds={this.handleSecondsChange}
                                onHandleMinutes={this.handleMinutesChange}
                                onHandleHours={this.handleHoursChange}
                            />
                        ))}
                    </div>
                    <hr />
                    {!this.state.ringing ? (
                        <div className="timer__control">
                            <div className="timer__control__repeat">
                                <span role="img" aria-label="repeat">
                                    &#x1F501;
                                </span>
                                <input
                                    type="checkbox"
                                    onChange={this.toggleRepeat}
                                    checked={this.state.repeat}
                                />
                            </div>
                            <button onClick={this.handleStart}>Start</button>{" "}
                            <button onClick={this.handleClear}>Clear</button>
                        </div>
                    ) : null}
                </div>
            );
        }
        return (
            <Hideable
                label="Timer"
                dir="top"
                align="center"
                margin="1.5vmin 0 1vmin 0"
            >
                {display}
            </Hideable>
        );
    }
}

export default Timer;
