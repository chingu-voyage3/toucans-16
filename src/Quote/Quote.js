import React, { Component } from "react";
import axios from "axios";
import "./quote.css";

class Quote extends Component {
    state = {
        quote: ""
    };
    componentDidMount() {
        const baseURL = "https://talaikis.com/api/quotes/random/";

        axios.get(baseURL).then(response => {
            this.setState({
                quote: response.data.quote
            });
        });
    }
    render() {
        return (
            <div className="quote">
                <q>{this.state.quote}</q>
            </div>
        );
    }
}

export default Quote;
