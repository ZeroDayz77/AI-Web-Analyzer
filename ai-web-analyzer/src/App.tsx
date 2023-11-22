import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('Database not connected!');
  const [summaryMessage, setSummaryMessage] = useState('Nothing to summarize...');
  const [websiteURL, setWebsiteURL] = useState('');
  const [summaryURL, setSummaryURL] = useState('');

  const [isLoaded, setLoaded] = useState(false);
  // const [data, setData] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => setMessage(response.data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // useEffect(() => {
  //   const apiUrl = 'http://localhost:5000/api/data';
  //   axios.get(apiUrl)
  //     .then(response => setData(JSON.stringify(response.data)))
  //     .catch(error => console.error('Error fetching data:', error));
  // }, []);

  const handleWebsiteSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setMessage("Currently finding all webpages... please hold...")

    try {
      const apiUrl = 'http://localhost:5000/api/add_website';

      // Make a POST request to add data
      await axios.post(apiUrl, { site: websiteURL })
      .then(response => setMessage(response.data.message));

      setWebsiteURL('');
      setLoaded(true)
      console.log(isLoaded)

      // Fetch updated data after adding new data
      // const updatedData = await axios.get('http://localhost:5000/api/data');
      // setData(JSON.stringify(updatedData.data));
    } 
    catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleSummarySubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log(isLoaded)

    if(isLoaded == false)
    {
      setSummaryURL('');
      alert("There is no website loaded, please load a website first...")
      return;
    }
    // TODO: add check to ensure that a website is loaded before this function can run, a simple boolean value can work.

    try {
      const apiUrl = 'http://localhost:5000/api/website_summary';

      // Make a POST request to add data
      await axios.post(apiUrl, { target_url: summaryURL })
      .then(response => setSummaryMessage(response.data.summary));

      setSummaryURL('');

      // Fetch updated data after adding new data
      // const updatedData = await axios.get('http://localhost:5000/api/data');
      // setData(JSON.stringify(updatedData.data));
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
          <form onSubmit={handleWebsiteSubmit}> {/*TODO: use Post later on when pushing to DB*/}
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
          <form onSubmit={handleSummarySubmit}> {/*TODO: use Post later on when pushing to DB*/}
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