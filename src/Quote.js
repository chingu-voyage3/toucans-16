import React from "react";
import axios from "axios";

class Quote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            baseURL: 'https://talaikis.com/api/quotes/random/',
            author: '',
            // link: '',
        }
    }

    componentDidMount() {
        axios.get(this.state.baseURL)
            .then((response) => {
                this.setState({
                    quote: response.data.quote,
                    author: response.data.author,
                    // link: response.data.quoteLink,
                })
                // .bind(this);
    
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
                {/* <p>{this.state.link}</p> */}
            </div>
        );
    }
}

export default Quote;
    
