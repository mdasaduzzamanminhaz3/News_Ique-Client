import { useState } from "react";
import { useForm } from "react-hook-form";
import authApiClient from "../../services/auth-api-client";
import { useNavigate } from "react-router";
import ErrorAlert from "../ErrorAlert";

const CategoryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name),
      formData.append("description", data.description);
    formData.append("is_premium", data.is_premium || false);
    setLoading(true);
    try {
      const res = await authApiClient.post("/api/v1/categories/", formData);
      setSuccessMsg(res.data.message || "Category Create Successfully!");
      navigate("/dashboard/categories");
      console.log(res.data);
    } catch (error) {
      console.log(data?.message);
      setErrorMsg(data?.message);
      console.log(error);
    } finally {
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
      {errorMsg && <ErrorAlert errorMsg={errorMsg} />}
      <h2 className="text-2xl font-semibold mb-4">Create A New Category</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Article Title
          </label>
          <input
            {...register("name", { required: true })}
            className="input input-bordered w-full"
            placeholder="Category name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">This field is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
            placeholder="Description"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-xs">This field is required</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("is_premium")}
            id="is_premium"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label
            htmlFor="is_premium"
            className="text-gray-700 text-sm font-medium"
          >
            Premium Category
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
