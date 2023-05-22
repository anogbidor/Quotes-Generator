import React, { useState, useEffect } from "react";
import "./Quote.css";

const url = "https://type.fit/api/quotes";
function QuoteGenerator() {
  const [quotes, setQuotes] = useState([]); // use state hook to initialize the state of the app to an empty array. This  array will hold te quotes
  const [quote, setQuote] = useState({ text: "", author: "" });

  useEffect(() => {
    // useEffect here is used to make the API call and handle the error which will logged to the console should there be any error.
    fetch(url)
      .then((response) => response.json()) // data from the API call is interpreted by json
      .then((data) => setQuotes(data)) // then the data then populates the quotes array.
      .catch((error) => console.log(error)); // Here we catch any error that may arise from the call
  }, []);

  function randomQuote() {
    // This logic here randomize the quotes which will come from the API
    const randomIndex = Math.floor(Math.random() * quotes.length); // in essence this method assigns a random number to the quotes anywhere between 0 and 1
    const { text, author } = quotes[randomIndex];
    return { text, author };
    // return quotes[randomIndex]?.text; // optional chaining here is used in case text doesn’t exist in the array. since we don't know what's on the menu :)
  }

  useEffect(() => {
    if (quotes.length > 0) {
      // checks if the quotes index is greater  than 0
      const selectedIndex = randomQuote(); // here we asign the function this variable for closure i guess
      setQuote(selectedIndex); //
    }
  }, [quotes]);

  return (
    <div className="quote-generator">
      <p className="quote-text">{quote.text}</p>
      <p className="quote-text"> - {quote.author}</p>

      {/* event handler  when the button is clicked*/}
      <button
        onClick={() => setQuote(randomQuote())}
        className="new-quote-button"
      >
        Get New Quote
      </button>
    </div>
  );
}

export default QuoteGenerator; // exported to be rendered to app
