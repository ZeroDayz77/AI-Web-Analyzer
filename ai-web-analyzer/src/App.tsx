import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('Database not connected!');
  const [summaryMessage, setSummaryMessage] = useState('Nothing to summarize...');
  const [websiteURL, setWebsiteURL] = useState('');
  const [summaryURL, setSummaryURL] = useState('');

  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => setMessage(response.data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  const handleWebsiteSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setMessage("Currently finding all webpages... please hold...")

    try {
      const apiUrl = 'http://localhost:5000/api/add_website';

      await axios.post(apiUrl, { site: websiteURL })
      .then(response => setMessage(response.data.message));

      setWebsiteURL('');
      setLoaded(true)
    } 
    catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleSummarySubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if(isLoaded == false)
    {
      setSummaryURL('');
      alert("There is no website loaded, please load a website first...")
      return;
    }

    try {
      const apiUrl = 'http://localhost:5000/api/website_summary';

      await axios.post(apiUrl, { target_url: summaryURL })
      .then(response => setSummaryMessage(response.data.summary));

      setSummaryURL('');

    } 
    catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <div>
        <header id='title-header'>
          <h1>AI Web Analyzer</h1>
        </header>
        <main>
          <h2>Website URL</h2>
          <p>{message}</p>
          <form onSubmit={handleWebsiteSubmit}>
            <input 
              id='websiteURL' 
              type="text" 
              placeholder="Enter your desired website here" 
              value={websiteURL} 
              onChange={event => setWebsiteURL(event.target.value)}
            />
            <input type="submit" value="Submit"></input>
          </form>
          <h2>Summary URL</h2>
          <form onSubmit={handleSummarySubmit}>
            <input 
              id='summaryURL' 
              type="text" 
              placeholder="Enter the URL you want to summarize" 
              value={summaryURL} 
              onChange={event => setSummaryURL(event.target.value)}
            />
            <input type="submit" value="Submit"></input>
          </form>
          <h2>Summary Output:</h2>
          <section id='summary-section'>
            <p>{summaryMessage}</p>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;