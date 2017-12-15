import React from "react";
import axios from "axios";

class Quote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: '',
            author: '',
            link: '',
        }
    }

    componentDidMount() {
        axios.get('http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en')
            .then((response) => {
                this.setState({
                    quote: response.data.quoteText,
                    author: response.data.quoteAuthor,
                    link: response.data.quoteLink,
                })
                    .bind(this);
    
            })
            // .catch( error => {
            //     console.log('Error fetching and parsing data', error);
            // });
    }
    


    render() {
    
        return (
            <div className="quote">
                <q>{this.state.quote}</q>
                <p>-{this.state.author}</p>
                <p>{this.state.link}</p>
            </div>
        );
    }
}

export default Quote;
    
