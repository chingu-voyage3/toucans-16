import React, { Component } from "react";
import axios from "axios";

class Quote extends Component {
    state = {
        quote: "",
        author: ""
    };
    componentDidMount() {
        const baseURL = "https://talaikis.com/api/quotes/random/";
        axios.get(baseURL).then(response => {
            this.setState({
                quote: response.data.quote,
                author: response.data.author
            });
        });
    }
    render() {
        return (
            <div className="quote">
                <q>{this.state.quote}</q>
                <p>{this.state.author}</p>
            </div>
        );
    }
}

export default Quote;
