import { useEffect, useState } from "react"
import apiClient from "../services/api-client"


const useFetchCategories = () => {
    const [categories,setCategories] = useState([]);
    useEffect(() => {
        apiClient.get('/api/v1/categories')
        .then((res) => {
            setCategories(res.data.results);
            // console.log(res.data);
        });

    },[])

    return categories;
}

export default useFetchCategories;