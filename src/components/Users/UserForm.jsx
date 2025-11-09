import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import authApiClient from "../../services/auth-api-client";
import ErrorAlert from "../ErrorAlert";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchUser = async () => {
    try {
      const res = await authApiClient.get(`/api/v1/users_list/${id}/`);
      setUser(res.data);
    } catch (error) {
      setError("Failed to fetch user",error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authApiClient.put(`/api/v1/users_list/${id}/`, user);
      setMessage("User updated successfully!");
      setTimeout(() => navigate("/dashboard/users"), 1500);
    } catch (error) {
      setError("Failed to update user",error);
    }
  };

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit User</h2>
      {error && <ErrorAlert error={error} />}
      {message && (
        <div className="alert alert-success mb-4">
          <span>{message}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="first_name"
          value={user.first_name || ""}
          onChange={handleChange}
          placeholder="First Name"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="last_name"
          value={user.last_name || ""}
          onChange={handleChange}
          placeholder="Last Name"
          className="input input-bordered w-full"
        />
        <input
          type="email"
          name="email"
          value={user.email || ""}
          onChange={handleChange}
          placeholder="Email"
          className="input input-bordered w-full"
        />
        <select
          name="role"
          value={user.role || ""}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="ADMIN">Admin</option>
          <option value="EDITOR">Editor</option>
          <option value="SUBSCRIBER">Subscriber</option>
        </select>
        <select
          name="is_active"
          value={user.is_active ? "true" : "false"}
          onChange={(e) =>
            setUser({ ...user, is_active: e.target.value === "true" })
          }
          className="select select-bordered w-full"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <button type="submit" className="btn btn-primary w-full">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserForm;