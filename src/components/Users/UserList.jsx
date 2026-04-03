import { useEffect, useState } from "react";
import { Search, Filter, UserPlus, Edit3, Trash2, ShieldCheck, Mail, User as UserIcon, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import authApiClient from "../../services/auth-api-client";
import Pagination from "../Article/Pagination";
import ErrorAlert from "../ErrorAlert";
import TableRowSkeleton from "../Skeleton/TableRowSkeleton";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await authApiClient.get(`/api/v1/users_list/?page=${page}`);
      setUsers(res.data.results);
      setTotalPages(Math.ceil(res.data.count / 10));
    } catch (error) {
      setError("Failed to fetch user directory.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [page, message]);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    const matchesSearch = fullName.includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    return matchesSearch && matchesRole;
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await authApiClient.delete(`/api/v1/users_list/${id}/`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setMessage("User account purged successfully.");
    } catch (error) {
      setError("Failed to delete user.");
    }
  };

  return (
    <div className="p-8 bg-[#020617] min-h-screen text-slate-300 pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <UserIcon className="text-blue-500" size={32} />
              USER <span className="text-blue-500 underline decoration-blue-500/30">DIRECTORY</span>
            </h1>
            <p className="text-gray-500 mt-2 font-medium uppercase tracking-[0.2em] text-[10px]">
              Manage access levels and monitor system participants
            </p>
          </div>
          
          <div className="flex gap-4">
            {message && (
              <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-xl animate-in fade-in slide-in-from-right-4">
                <ShieldCheck size={16} className="text-green-400" />
                <span className="text-green-400 text-[10px] font-black uppercase tracking-widest">{message}</span>
              </div>
            )}
            {error && <ErrorAlert error={error} />}
          </div>
        </div>

        {/* Controls Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-3 relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search by identity or electronic mail..."
              className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all font-medium placeholder:text-gray-600"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={16} />
            <select
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none font-bold text-xs uppercase tracking-widest"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="" className="bg-[#020617]">All Roles</option>
              <option value="ADMIN" className="bg-[#020617]">Admin</option>
              <option value="EDITOR" className="bg-[#020617]">Editor</option>
              <option value="SUBSCRIBER" className="bg-[#020617]">Subscriber</option>
            </select>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-8 py-6 text-left text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Identity</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Email</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Role</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-8 py-6 text-left text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Tier</th>
                  <th className="px-8 py-6 text-right text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  [...Array(6)].map((_, i) => <TableRowSkeleton key={i} />)
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 font-black text-xs border border-blue-500/20">
                            {user.first_name?.[0]}{user.last_name?.[0]}
                          </div>
                          <span className="text-sm font-bold text-white whitespace-nowrap">
                            {user.first_name} {user.last_name}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                          <Mail size={14} className="text-gray-600" />
                          {user.email}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black tracking-widest ${
                          user.role === 'ADMIN' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 
                          user.role === 'EDITOR' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                          'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${user.is_active ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'}`} />
                          <span className={`text-[10px] font-black uppercase tracking-widest ${user.is_active ? 'text-green-500' : 'text-red-500'}`}>
                            {user.is_active ? "Online" : "Locked"}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`text-[10px] font-black tracking-widest ${user.is_premium ? 'text-yellow-500' : 'text-gray-600'}`}>
                          {user.is_premium ? "★ PREMIUM" : "STANDARD"}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => navigate(`/dashboard/users/edit/${user.id}/`)} 
                            className="p-2 hover:bg-blue-500/10 text-blue-500 rounded-lg transition-colors border border-transparent hover:border-blue-500/20"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(user.id)}
                            className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-4 bg-white/5 rounded-full"><UserPlus className="text-gray-600" size={32} /></div>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm text-center">No system participants found matching criteria.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Section */}
        <div className="mt-8 flex justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            handlePageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </div>
    </div>
  );
};

export default UserList;