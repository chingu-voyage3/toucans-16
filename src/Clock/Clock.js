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
                { this.state.time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
            </h1>
        )
    }
}

export default Clock;