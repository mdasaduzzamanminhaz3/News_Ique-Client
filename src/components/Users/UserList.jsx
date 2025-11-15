import { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";
import Pagination from "../Article/Pagination";
import ErrorAlert from "../ErrorAlert";
import { useNavigate } from "react-router";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [Filter, setFilter] = useState("");
  const [error, setError] = useState("");
  const [message,setMessage] = useState("");
  const navigate = useNavigate();
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await authApiClient.get(`/api/v1/users_list/?page=${page}`);
      setUsers(res.data.results);
      // console.log(res.data.results);
      setTotalPages(Math.ceil(res.data.count / 10));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.first_name?.toLowerCase().includes(search.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = Filter ? user.role === Filter : true;

    return matchesSearch && matchesRole;
  });

  const handleDelete = async (id) => {
    try {
      await authApiClient.delete(`/api/v1/users_list/${id}/`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setMessage("User deleted successfully !")
    } catch (error) {
      console.log(error);
      setError("Failed to delete user", error);
    }
  };


  const handleEdit = (id) => {
    navigate(`/dashboard/users/edit/${id}/`)
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        {error && <ErrorAlert error={error} />}
      {message && (
            <div role="alert" className="alert alert-success duration-500">
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
              <span>{message}</span>
            </div>
          )}
        <h2 className="text-xl font-bold">Manage Users</h2>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered"
          value={Filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="EDITOR">Editor</option>
          <option value="SUBSCRIBER">Subscriber</option>
        </select>
      </div>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Premium</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan="5"
                className="text-center py-4 text-gray-500 animate-pulse"
              >
                Loading users...
              </td>
            </tr>
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  {user?.first_name} {user?.last_name}
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.is_active ? "Active" : "Inactive"}</td>
                <td>{user.is_premium ? "Active":"Inactive"}</td>
                <td className="flex gap-2">
                  <button onClick={() => handleEdit(user.id)} className="btn btn-sm btn-outline btn-primary">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default UserList;
