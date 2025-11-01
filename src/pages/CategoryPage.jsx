import { useState } from "react";
import Category from "../components/Categories/Category";
import useFetchCategories from "../hooks/useFetctCategories";
import authApiClient from "../services/auth-api-client";

const CategoryPage = () => {
  const { categories, error, loading, setError,setCategories, setLoading } =
    useFetchCategories();
  const [editingId, setEditingId] = useState(null);
  const handleEdit = (id) => {
    setEditingId(id);
  };
  const cancleEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = async (updatedCategory) => {
    setEditingId(null);
    await authApiClient
      .put(`/api/v1/categories/${updatedCategory.id}/`, updatedCategory)
      .then((res) => {
        const updatedCagories = categories.map((cat) =>
          cat.id === updatedCategory.id ? res.data : cat
        );
        setCategories(updatedCagories);
        console.log(updatedCagories);
      })
      .catch((error) => {
        setError("updating Fail!!");
        console.log(error);
      });
  };

  const handleDelete = async (id) => {
    try {
      await authApiClient.delete(`/api/v1/categories/${id}/`);
      console.log("Successfully delete category!!");
    } catch (error) {
      console.log("deleted failed!", error);
    }
  };

  return (
    <div>
      <Category
        categories={categories}
        error={error}
        loading={loading}
        onDelete={handleDelete}
        editingId={editingId}
        onEdit={handleEdit}
        onCancel={cancleEdit}
        onSave={handleSaveEdit}
        setLoading={setLoading}
      />
    </div>
  );
};

export default CategoryPage;
