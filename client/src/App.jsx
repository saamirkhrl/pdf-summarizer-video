import React, { useState } from "react";

function App() {
  const [pdf, setPdf] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdf(file);
    }
  };

  const fetchAPI = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("pdf", pdf);
    setLoading(true);

    const res = await fetch("http://localhost:5001/api", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setSummary(data.message);
  };

  return (
    <>
      <input type="file" accept="application/pdf" onChange={handleFileUpload} />
      <button onClick={fetchAPI}>Generate AI summary</button>
      {summary && <p>{summary}</p>}
      {loading && <h3>Loading...</h3>}
    </>
  );
}

export default App;
