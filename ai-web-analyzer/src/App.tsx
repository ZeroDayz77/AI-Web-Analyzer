import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [websiteURL, setWebsiteURL] = useState('');
  const [data, setData] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => setMessage(response.data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const apiUrl = 'http://localhost:5000/api/data';
    axios.get(apiUrl)
      .then(response => setData(JSON.stringify(response.data)))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const apiUrl = 'http://localhost:5000/api/add_data';

      // Make a POST request to add data
      await axios.post(apiUrl, { websiteURL });

      setWebsiteURL('');

      // Fetch updated data after adding new data
      const updatedData = await axios.get('http://localhost:5000/api/data');
      setData(JSON.stringify(updatedData.data));
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <div>
        <h1>AI Web Analyzer</h1>
        <h2>Website URL</h2>
        <form onSubmit={handleFormSubmit}> {/*TODO: use Post later on when pushing to DB*/}
          <input 
            id='websiteURL' 
            type="text" 
            placeholder="Enter your desired website here" 
            value={websiteURL} 
            onChange={event => setWebsiteURL(event.target.value)}
          />
          <input type="submit" value="Submit"></input>
        </form>
        <p>{message}</p>
        <p>{data}</p>
      </div>
    </>
  );
}

export default App;