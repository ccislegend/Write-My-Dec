// src/components/DecGenerator/DecGenerator.js
import React, { useState } from "react";
import "./DecGenerator.css";

function DecGenerator() {
  const [textInput, setTextInput] = useState("");
  const [responseText, setResponseText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/.netlify/functions/openai-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        textInput,
      }),
    });

    const data = await response.json();
    setResponseText(data.response);
  };

  const copyTextToClipboard = () => {
    const textToCopy = document.getElementById("decResponse");
    const textarea = document.createElement("textarea");
    textarea.textContent = textToCopy.textContent;
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

  return (
    <div className="DecGenerator">
      <form onSubmit={handleSubmit}>
        <h1>Write My Dec</h1>
        <label htmlFor="textInput">Enter bullets or text:</label>
        <textarea
          type="text"
          id="textInput"
          name="textInput"
          style={{ overflow: "hidden" }}
          value={textInput}
          onChange={(event) => setTextInput(event.target.value)}
        />
        <button type="submit">Generate</button>
      </form>
      <div className="response-container">
        <label htmlFor="response" id="responseLbl">
          Generated Decoration Citation:
        </label>
        <p id="decResponse">{responseText}</p>
        <button onClick={copyTextToClipboard} id="copyButton">
          Copy Text
        </button>
      </div>
    </div>
  );
}

export default DecGenerator;
