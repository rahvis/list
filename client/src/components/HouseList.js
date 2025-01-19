import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HouseList() {
  const [houses, setHouses] = useState([]);
  const [voiceInput, setVoiceInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      const response = await axios.get("/api/houses");
      setHouses(response.data);
    } catch (error) {
      console.error("Error fetching houses:", error);
    }
  };

  const deleteHouse = async (id) => {
    try {
      await axios.delete(`/api/houses/${id}`);
      fetchHouses();
    } catch (error) {
      console.error("Error deleting house:", error);
    }
  };

  const handleVoiceRecording = () => {
    if (isRecording) {
      // Stop Recording
      stopVoiceRecording();
    } else {
      // Start Recording
      startVoiceRecording();
    }
  };

  const startVoiceRecording = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setVoiceInput(transcript);
      setIsRecording(false);
      console.log("Voice Input:", transcript);
      playVoiceInput(transcript); // Play the transcript after recording
    };

    recognition.onerror = (event) => {
      console.error("Error during speech recognition:", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const stopVoiceRecording = () => {
    // End recording logic (Web Speech API stops automatically after recording)
    setIsRecording(false);
  };

  const playVoiceInput = (text) => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="house-list">
      <h2>House Listings</h2>
      {/* Voice Input Section */}
      <div className="voice-input-section">
        <button onClick={handleVoiceRecording} className="btn btn-voice">
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
        {voiceInput && <p>Your Input: {voiceInput}</p>}
      </div>

      {/* Houses List */}
      <div className="house-grid">
        {houses.map((house) => (
          <div key={house._id} className="house-card">
            <h3>{house.title}</h3>
            <p>{house.address}</p>
            <p>Price: ${house.price}</p>
            <p>
              {house.bedrooms} bed, {house.bathrooms} bath
            </p>
            <div className="house-actions">
              <Link to={`/edit/${house._id}`} className="btn btn-edit">
                Edit
              </Link>
              <button
                onClick={() => deleteHouse(house._id)}
                className="btn btn-delete"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HouseList;
