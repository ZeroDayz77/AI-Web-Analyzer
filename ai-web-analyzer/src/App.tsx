import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [websiteURL, setWebsiteURL] = useState('');
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

  const handleWebsiteSubmit = async (event) => {
    event.preventDefault();

    setMessage("Currently finding all webpages... please hold...")

    try {
      const apiUrl = 'http://localhost:5000/api/add_website';

      // Make a POST request to add data
      await axios.post(apiUrl, { site: websiteURL })
      .then(response => setMessage(response.data.message));

      setWebsiteURL('');

      // Fetch updated data after adding new data
      // const updatedData = await axios.get('http://localhost:5000/api/data');
      // setData(JSON.stringify(updatedData.data));
    } 
    catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleSummarySubmit = async (event) => {
    event.preventDefault();
    alert("Summarized page info :)")
    // TODO: add check to ensure that a website is loaded before this function can run, a simple boolean value can work.
  };

  return (
    <>
      <div>
        <h1>AI Web Analyzer</h1>
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
            id='websiteURL' 
            type="text" 
            placeholder="Enter your desired website here" 
            value={websiteURL} 
            onChange={event => setWebsiteURL(event.target.value)}
          />
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    </>
  );
}

export default App;