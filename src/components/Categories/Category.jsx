import { useEffect, useState } from "react";
import { Link } from "react-router"; 
import apiClient from "../../services/api-client";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiClient.get("/categories")
      .then((res) => {
        setCategories(res.data.results);
        console.log("Category response:", res.data.results);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false)); 
  }, []);

  if (loading) {
    return (
      <div className="px-4 py-2 text-gray-500 dark:text-gray-300 text-sm">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-2 text-red-500 text-sm">
        Error loading categories: {error}
      </div>
    );
  }

  return (
    <div className="py-2">
      {Array.isArray(categories) && categories.map((cat) => (
        <Link key={cat.id} to={`/category/${cat.name.toLowerCase()}`}>
          <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 capitalize text-sm text-gray-700 dark:text-gray-200">
            {cat.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Category;