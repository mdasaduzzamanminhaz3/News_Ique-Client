import StatCardSkeleton from "../Skeleton/StatCardSkeleton";
import EditForm from "./EditForm";

const Category = ({ categories, error, loading,onEdit,onDelete,onSave,onCancel,editingId }) => {





  if (loading) {
    return (
        <>
            {[...Array(7)].map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </>
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
    <div>
      <h1 className="text-3xl font-bold text-center mb-2">Categories</h1>
    <div className="py-2 px-3 grid grid-cols-2 gap-4 shadow-sm text-center">
      {Array.isArray(categories) &&
        categories.map((cat) => (
          <div key={cat.id}>

            {editingId === cat.id? (
              <EditForm category={cat} onSave={onSave}onCancel={onCancel}/>
            ):(

            <div className=" bg-gray-100 shadow-lg rounded-2xl">
              <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 capitalize text-lg font-bold text-gray-700 dark:text-gray-200">
                {cat.name}
              </div>
              <div className="block px-4 py-2 hover:bg-gray-100  dark:hover:bg-gray-700 capitalize  text-gray-700 dark:text-gray-200">
                {cat.description}
              </div>
              <div className="flex justify-between px-3 py-2">

            <button className="btn outline outline-blue-500 text-blue-800" onClick={() => onEdit(cat.id)}>Edit</button>
            <button className="btn outline outline-red-500 text-red-800" onClick={() => onDelete(cat.id)}>{loading ? "Deleting":"Delete"}</button>
              </div>
            </div>
            )}
          </div>

        ))}
    </div>
    </div>
    
  );
};

export default Category;



