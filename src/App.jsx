import { useState } from 'react'
import './App.css'
import { useMetaApi } from './api/metaApi';
import axios from 'axios';
import apiEndpoints from './api/apiEndpoint';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { metaApi } = apiEndpoints;

  const [url, setUrl] = useState("");

  const urlInputHandler = (event) => {
    setUrl(event.target.value)
  }

  const fetchMetaDataHandler = async () => {
    if (import.meta.env.VITE_API_BEARER_TOKEN) {
      setIsLoading(true);

      try {
        const apiResponse = await axios.get(`${metaApi}?url=${encodeURIComponent(url)}`, { headers: { Authorization: "Bearer" + import.meta.env.VITE_API_BEARER_TOKEN } });
        console.log("apiResponse:", apiResponse);
        setData(apiResponse);
      } catch (error) {
        console.error("error:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline text-center">Title</h1>
      </div>
      <div className="w-full max-w-xs content-center">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-3 flex">
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-initial w-64 ..." type="text" id="input" onChange={urlInputHandler} placeholder='input' />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchMetaDataHandler} type="button">
              search
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default App
