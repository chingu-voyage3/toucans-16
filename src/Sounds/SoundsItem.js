import React, { Component } from "react";

class Sounds extends Component {
    state = {
        playing: false,
        audio: new Audio()
    };
    componentWillMount() {
        this.state.audio.src = this.props.src;
        this.state.audio.loop = true;
        this.state.audio.volume = 0.5;
    }
    handleClick = () => {
        this.setState({
            playing: !this.state.playing
        });
        if (this.state.playing) this.state.audio.pause();
        else this.state.audio.play();
    };
    handleVolume = event => {
        this.state.audio.volume = event.target.value;
    };
    render() {
        return (
            <li className="sounds__item">
                <button onClick={this.handleClick}>{this.props.name}</button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="any"
                    defaultValue="0.5"
                    onChange={this.handleVolume}
                />
            </li>
        );
    }
}

export default Sounds;
