import { useState, useEffect } from "react";
import apiEndpoints from "./apiEndpoint";


export const useMetaApi = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { metaApi } = apiEndpoints;

    const fetchMetaData = async () => {
        if (import.meta.env.VITE_API_BEARER_TOKEN) {
            setIsLoading(true);

            try {
                const apiResponse = await axios.get(`${metaApi}?url=${url}`, { Headers: { Authorization: "Bearer" + import.meta.env.VITE_API_BEARER_TOKEN } });
                console.log("apiResponse:", apiResponse);
                setData(apiResponse);
            } catch (error) {
                console.error("error:", error);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }
    }

    useEffect(() => {
        fetchMetaData
    }, []);

    return { data, isLoading, error };
}