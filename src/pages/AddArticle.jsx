import { useForm } from "react-hook-form";
import authApiClient from "../services/auth-api-client";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const AddArticle = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [prevImage, setPrevImage] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading,setLoading]= useState(false);
  const [successMsg,setSuccessMsg] = useState("");

  //fetching category
  useEffect(() => {
    apiClient.get("/api/v1/categories/").then((res) => {
      // console.log(res.data);
      setCategories(res?.data.results);
    });
  }, []);
  //handle image change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(files);
    setPrevImage(
      files.map((file) => 
        URL.createObjectURL(file)
)
    );
  };
  //submit article details
  const handleAddArticle = async (data) => {
    setLoading(true);
    try{
      const formData = new FormData();
      formData.append("headline",data.headline);
      formData.append("body",data.body);
      formData.append("category",data.category);
      formData.append("is_published",data.is_published?'true':'false');

      if(data.image && data.image.length > 0 ){
        formData.append("image",data.image[0]);
      }


    const articleRes = await authApiClient.post("/api/v1/articles/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Article created",articleRes.data);
    setSuccessMsg(articleRes.data.message || "Article created successfully!");

    }catch(error){
      console.log("Error creating article:",error.response?.data || error);
    }finally{
      setLoading(false);
    }

  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {successMsg && (
            <div role="alert" className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{successMsg}</span>
            </div>
          )}

      <h2 className="text-2xl font-semibold mb-4">Create A New Article</h2>

      <form onSubmit={handleSubmit(handleAddArticle)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Article Title</label>
          <input
            {...register("headline", { required: true })}
            className="input input-bordered w-full"
            placeholder="article title"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">This field is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            {...register("body", { required: true })}
            className="textarea textarea-bordered w-full"
            placeholder="Description"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-xs">This field is required</p>
          )}
        </div>

        {/* Dropdown for categories */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            {...register("category", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs">This field is required</p>
          )}
        </div>
        {/* image field */}
        <div>
          <label className="text-sm block font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
            onChange={(e)=>{handleImageChange(e)
              register('image').onChange(e)
            }}
            className="file-input file-input-bordered w-full"
          />
        </div>
        {prevImage.length> 0 && <div className="flex gap-2 mt-2">
            {prevImage.map((src,idx) =>(
                <img src={src} key={idx} />
            ))}
        </div> }
        
        {errors.image && (
          <p className="text-red-500 text-xs">This field is required</p>
        )}
        {/* is_published check box */}
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register("is_published")}
            className="checkbox"
          />
          <label className="text-sm font-medium ml-2 ">is published?</label>
        </div>

        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Creating..." : "Create Article"}
        </button>
      </form>
    </div>
  );
};

export default AddArticle;
