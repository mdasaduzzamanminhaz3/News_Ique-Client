import  { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import authApiClient from "../../services/auth-api-client";

const UpdateArticle = () => {
  const { id } = useParams();
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [prevImage, setPrevImage] = useState([]);
  const [categories, setCategories] = useState([]);

    useEffect(() => {
    // fetch categories
    authApiClient.get("/api/v1/categories/").then(res => {
      setCategories(res.data?.results || res.data);
    });

    // fetch existing article
    authApiClient.get(`/api/v1/articles/${id}/`).then(res => {
      const article = res.data;
      console.log(article);
      setValue("headline", article.headline);
      setValue("body", article.body);
      setValue("category", article.category.id);
      setValue("is_published", article.is_published);
      setPrevImage([article.image]);
    });
  }, [id, setValue]);


const handleEditArticle = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("headline", data.headline);
      formData.append("body", data.body);
      formData.append("category", data.category);
      formData.append("is_published", data.is_published ? "true" : "false");
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      await authApiClient.patch(`/api/v1/articles/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/dashboard/article-page"); 
    } catch (err) {
      console.error("Error updating article:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target?.files);
    setPrevImage(files.map(file => URL.createObjectURL(file)));
  };
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Edit Article</h2>
      <form onSubmit={handleSubmit(handleEditArticle)} className="space-y-4">
        {/* Headline */}
        <input
          {...register("headline", { required: true })}
          placeholder="Headline"
          className="input input-bordered w-full"
        />
        {errors.headline && <p className="text-red-500 text-xs">Required</p>}

        {/* Body */}
        <textarea
          {...register("body", { required: true })}
          className="textarea textarea-bordered w-full"
          placeholder="Body"
        />
        {errors.body && <p className="text-red-500 text-xs">Required</p>}

        {/* Category */}
        <select
          {...register("category", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-xs">Required</p>}

        {/* Image */}
        <input
          type="file"
          accept="image/*"
          {...register("image")}
          onChange={handleImageChange}
          className="file-input file-input-bordered w-full"
        />
        {prevImage.length > 0 && (
          <img src={prevImage[0]} className="mt-2 w-32 h-32 object-cover" />
        )}

        {/* is_published */}
        <label className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            {...register("is_published")}
            className="checkbox"
          />
          <span>Published?</span>
        </label>

        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Article"}
        </button>
      </form>
    </div>
  );
};

export default UpdateArticle;
