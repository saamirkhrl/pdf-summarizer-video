import React, { useState } from "react";

function App() {
  const [pdf, setPdf] = useState(null);
  const [summary, setSummary] = useState("");

  const handleFileUpload = (e) => {
    e.preventDefault();
    const file = e.target.file;
    if (file.type === "application/pdf") {
      setPdf(file);
    }
  };

  const fetchAPI = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <input type="file" accept="application/pdf" onChange={handleFileUpload} />
      <button onClick={fetchAPI}>Generate AI summary</button>
      {pdf && <p>Selected file: {pdf.name}</p>}
      {summary && <h3>{summary}</h3>}
    </>
  );
}

export default App;
