import React, {useState, useEffect} from 'react';
import './App.scss';
import COLORS_ARRAY from "./colorsArray.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'


function App() {
  
  //Create variables whose values are the quote and author to be displayed on the page
    
  const [quote, setQuote] = useState("The greatest glory in living lies not in never falling, but in rising every time we fall.")
  const [author, setAuthor] = useState("Nelson Mandela")
  const [quotesArray, setQuotesArray] = useState(null)
  const [color, setColor] = useState('#6680B3')
  
  // Fetch data from a database containing quotes and their respective author:
  
  const quoteDB = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
  
  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
  }
  
  useEffect(() => {
    fetchQuotes(quoteDB)
  }, [quoteDB])
  
  // Generate a random quote from the quote database:
  
  const getRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random())
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
    setColor(COLORS_ARRAY[randomInteger])
  }

  // Render the application on a Webpage
  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: color}}>
        <div id="quote-box" style={{color: color}}>
          <p id="text">
            <span id='quote-icon'><FontAwesomeIcon icon={faQuoteLeft}/></span>{quote}"
          </p>
          <p id="author">
            - {author}
          </p>
          <div class="button">
            <a id="tweet-quote" style={{backgroundColor: color}} href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} - ${author}`)}><FontAwesomeIcon icon={faTwitter} /></a>
          </div>
            <button id="new-quote" style={{backgroundColor: color}} onClick={()=> getRandomQuote()}>Change Quote</button>
        </div>
      </header>
    </div>
  );
}

export default App;
