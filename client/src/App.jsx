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
    if (!pdf) {
      console.log("no pdf");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdf);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/api", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setSummary(data.message);
    } catch (error) {
      console.error("Error fetching API:", error);
      setSummary(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
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
