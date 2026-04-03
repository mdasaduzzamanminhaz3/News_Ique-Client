import { FiMenu, FiX, FiBell, FiSearch, FiUser, FiLogOut, FiHome } from "react-icons/fi";
import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

const Navbar = ({ sidebarOpen, toggleSidebar }) => {
  const { logoutUser, user } = useAuthContext();

  return (
    <nav className="sticky top-4 z-40 px-4">
      <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] px-4 md:px-6 py-3 shadow-2xl shadow-black/20 flex items-center justify-between transition-all duration-300">
        
        {/* Left: Menu & Brand */}
        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            <button 
              onClick={toggleSidebar}
              className="p-2 hover:bg-white/10 rounded-xl text-gray-400 transition-colors active:scale-90"
            >
              {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
          
          <div className="hidden md:block">
             <h2 className="text-xl font-black text-white tracking-tight">
               News<span className="text-blue-500 text-2xl">I</span>que
             </h2>
          </div>
        </div>

        {/* Center: Quick Search (Optional but looks Pro) */}
        <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-black/20 border border-white/5 rounded-2xl focus-within:border-blue-500/50 transition-all group w-64">
          <FiSearch className="text-gray-500 group-focus-within:text-blue-400" />
          <input 
            type="text" 
            placeholder="Search updates..." 
            className="bg-transparent border-none outline-none text-xs text-gray-300 placeholder:text-gray-600 w-full"
          />
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Notifications */}
          <button className="relative p-2.5 text-gray-400 hover:text-blue-400 hover:bg-white/5 rounded-xl transition-all">
            <FiBell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#020617]"></span>
          </button>

          {/* User Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="flex items-center gap-3 p-1 pr-3 hover:bg-white/5 rounded-2xl cursor-pointer transition-all border border-transparent hover:border-white/10">
              <div className="avatar">
                <div className="w-10 rounded-xl ring ring-blue-500/20 ring-offset-base-100 ring-offset-2">
                  <img
                    alt="User"
                    src={user?.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                  />
                </div>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-black text-white leading-none capitalize">{user?.username || "Admin"}</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mt-1">Super Admin</p>
              </div>
            </label>
            
            <ul
              tabIndex={0}
              className="dropdown-content mt-4 z-[10] p-2 shadow-2xl bg-[#0f172a] border border-white/10 rounded-2xl w-56 backdrop-blur-xl animate-in fade-in slide-in-from-top-2"
            >
              <div className="px-4 py-3 border-b border-white/5 mb-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Account</p>
              </div>
              <li>
                <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-blue-600/10 hover:text-blue-400 rounded-xl transition-all font-medium">
                  <FiHome size={18} /> Home
                </Link>
              </li>
              <li>
                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-blue-600/10 hover:text-blue-400 rounded-xl transition-all font-medium">
                  <FiUser size={18} /> My Profile
                </Link>
              </li>
              <div className="h-px bg-white/5 my-2"></div>
              <li>
                <button 
                  onClick={logoutUser}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-bold"
                >
                  <FiLogOut size={18} /> Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;