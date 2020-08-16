import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Quotes extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      index:0,
    }
    this.newQuote = this.newQuote.bind(this)
  }

  componentDidMount() {
    fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
    .then(response => response.json())
    .then(data => {
      this.setState({
        quotes: data.quotes,
        index: Math.round(Math.random()*100),
      })
      console.log(data.quotes)
    })
  }

  newQuote() {
    this.setState({
      index: Math.round(Math.random()*100),
    })
  }

  render() {
    const twitter = 'https://twitter.com/intent/tweet'
    const { quotes, index } = this.state
    if(!quotes) return <h2>Loading</h2>

    return (
      <div id="quote-box" className="App">
          <h4 id="text">{quotes[index].quote}</h4>
          <p id="author">{quotes[index].author}</p>
          <button className='btn btn-primary button-position' id="new-quote" onClick={this.newQuote}>New Quote</button>
          <br/><br/>
          <a id="tweet-quote" className="btn btn-primary twitter-button-position" href={twitter} target='_blank' rel="noopener noreferrer">Tweet</a>
      </div>
    );
  }
}

export default Quotes;