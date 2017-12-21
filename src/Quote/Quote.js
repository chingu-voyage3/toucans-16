import React from "react";
import axios from "axios";
import './Quote.css';

class Quote extends React.Component {
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
            <blockquote className="quote">
                <div className="quote-body">
                    <q className="quote-text">{this.state.quote}</q>
                    <p className="quote-source">- {this.state.author}</p>
                </div>
            </blockquote>
        );
    }
}

export default Quote;
