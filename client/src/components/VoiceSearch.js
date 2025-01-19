// client/src/components/VoiceSearch.js
import React, { useState } from "react";
import axios from "axios";

const VoiceSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Voice Input Transcript:", transcript); // Add this log
      setQuery(transcript);
      setIsRecording(false);
    };

    recognition.onerror = (err) => {
      console.error("Speech recognition error:", err);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const handleSearch = async () => {
    console.log("Searching for:", query); // Add this line to verify the query
    if (!query) {
      alert("Please enter a search query.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/query", {
        query,
      });
      console.log("Search Results:", response.data); // Log response data
      setResults(response.data);
    } catch (err) {
      console.error("Error fetching results:", err);
    }
  };

  return (
    <div>
      <button onClick={handleVoiceInput} className="btn">
        {isRecording ? "Recording..." : "Click to Speak"}
      </button>
      <br></br>
      <br></br>
      <br></br>
      {query && <p>Your Query: {query}</p>}
      <button onClick={handleSearch} className="btn btn-search">
        Search
      </button>

      <div className="results">
        {results.map((house, index) => (
          <div key={index} className="house-card">
            <h3>{house.title}</h3>
            <p>{house.address}</p>
            <p>Description: ${house.description}</p>
            <p>Price: ${house.price}</p>
            <p>
              {house.bedrooms} bed, {house.bathrooms} bath
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoiceSearch;
