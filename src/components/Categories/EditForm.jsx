import  { useState } from 'react';

const EditForm = ({ category, onSave, onCancel }) => {
    const [name, setName] = useState(category.name);
    const [description, setDescription] = useState(category.description);
    const [isPremium,setIsPremium] =useState(category.is_premium || false);
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ 
            ...category, 
            name: name, 
            description: description,
            is_premium:isPremium
        });
    };

    return (
        <div className=" bg-white border border-blue-500 shadow-xl rounded-2xl p-4">
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label className="block text-left text-xs font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 text-lg font-bold"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-left text-xs font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 text-sm"
                        rows="3"
                        required
                    ></textarea>
                </div>
                <div className="mb-4 flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={isPremium}
                        onChange={(e) => setIsPremium(e.target.checked)}
                        id="isPremium"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isPremium" className="text-gray-700 text-sm font-medium">
                        Premium
                    </label>
                </div>
                <div className="flex justify-between gap-2">
                    <button
                        type="submit"
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-150"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition duration-150"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditForm;