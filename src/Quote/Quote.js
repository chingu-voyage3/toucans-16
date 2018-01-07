import React, { Component } from "react";
// import axios from "axios";
import "./Quote.css";

class Quote extends Component {
    state = {
        quote: "",
        author: ""
    };
    componentDidMount() {
        // const baseURL = "https://talaikis.com/api/quotes/random/";
        /* axios.get(baseURL).then(response => {
            this.setState({
                quote: response.data.quote,
                author: response.data.author
            });
        }); */
    }
    render() {
        return (
            <div className="quote-body">
                <q className="quote-text">{this.state.quote}</q>
                <p className="quote-source">- {this.state.author}</p>
            </div>
        );
    }
}

export default Quote;
