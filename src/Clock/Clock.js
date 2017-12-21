import React from 'react';
import './Clock.css';

class Clock extends React.Component {

    constructor() {
        super()
        this.state= {
            time:new Date()
        }
    }

    componentWillMount() {
        setInterval(() => this.currentTime(),1000)
    }

    currentTime() {
        this.setState(
            {
                time: new Date()
            })
    }

    render() {

        return (
            <h1 className="live-clock">
                { this.state.time.toLocaleTimeString().seconds(0) }
            </h1>
        )
    }
}

export default Clock;