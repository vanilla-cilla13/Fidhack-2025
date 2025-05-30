import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [resumeText, setResumeText] = useState("");
  const [jobText, setJobText] = useState("");
  const [matchedWords, setMatchedWords] = useState([]);
  const [highlightedJob, setHighlightedJob] = useState([]);
  const [quote, setQuote] = useState("");
  const [activity, setActivity] = useState("");

  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => setQuote(`🌸 Inspirational Quote\n"${data.content}" — ${data.author}`))
      .catch(() => setQuote("🌸 Inspirational Quote\nCould not load quote."));

    fetch("https://www.boredapi.com/api/activity?type=education")
      .then((res) => res.json())
      .then((data) => setActivity(`📚 Learning Activity\nTry this: ${data.activity}`))
      .catch(() => setActivity("📚 Learning Activity\nCould not load activity."));
  }, []);

  const compareText = () => {
    const resumeWords = new Set(resumeText.toLowerCase().match(/\b\w{4,}\b/g));
    const jobWords = new Set(jobText.toLowerCase().match(/\b\w{4,}\b/g));
    const matches = [...jobWords].filter((word) => resumeWords.has(word));
    setMatchedWords(matches);

    const highlighted = jobText.split(/(\b)/).map((word, i) =>
      resumeWords.has(word.toLowerCase()) && jobWords.has(word.toLowerCase()) ? (
        <span key={i} className="highlight">{word}</span>
      ) : (
        word
      )
    );

    setHighlightedJob(highlighted);
  };

  return (
    <div className="container">
      <div className="info-box">{quote}</div>
      <div className="info-box">{activity}</div>

      <label>Your Resume</label>
      <textarea
        placeholder="Paste your resume text here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />

      <label>Job Description</label>
      <textarea
        placeholder="Paste the job description here..."
        value={jobText}
        onChange={(e) => setJobText(e.target.value)}
      />

      <button onClick={compareText}>Compare</button>

      <div className="results">
        <h3>✅ Matched Keywords ({matchedWords.length})</h3>
        <p>{matchedWords.length ? matchedWords.join(", ") : "No matches found."}</p>
        <h3>📌 Highlighted Job Description</h3>
        <p>{highlightedJob}</p>
      </div>
    </div>
  );
}

export default App;
