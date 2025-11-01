import { useEffect, useState } from "react"
import apiClient from "../services/api-client"


const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiClient.get("/api/v1/categories")
      .then((res) => {
        setCategories(res.data?.results);
        // console.log("Category response:", res.data?.results);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false)); 
  }, []);


    return {
        categories,
        setCategories,
        error,
        setError,
        loading
    };
}

export default useFetchCategories;