import { FaNewspaper } from "react-icons/fa";
import {
  FiBarChart2,
  FiPackage,
  FiPlusCircle,
  FiStar,
  FiTag,
  FiUsers,
  FiChevronRight,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { to: "/dashboard", icon: FiBarChart2, label: "Analytics" },
    { to: "/dashboard/article-page", icon: FiPackage, label: "All Articles" },
    { to: "/dashboard/articles/add", icon: FiPlusCircle, label: "Create News" },
    { to: "/dashboard/categories", icon: FiTag, label: "Categories" },
    { to: "/dashboard/categories/add", icon: FiPlusCircle, label: "Add Category" },
    { to: "/dashboard/reviews", icon: FiStar, label: "Reviews" },
    { to: "/dashboard/users", icon: FiUsers, label: "User Management" },
  ];

  return (
    <div className="drawer-side z-50">
      <label
        htmlFor="drawer-toggle"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      
      <aside className="w-72 min-h-full bg-[#020617] border-r border-white/5 p-6 flex flex-col shadow-2xl relative overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none"></div>

        {/* Sidebar Header */}
        <div className="relative z-10 flex items-center gap-3 mb-12 px-2">
          <div className="p-2.5 bg-blue-600/20 rounded-xl rotate-6 group-hover:rotate-0 transition-transform">
            <FaNewspaper className="h-6 w-6 text-blue-500" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tighter uppercase">
            News<span className="text-blue-500">I</span>que
          </h1>
        </div>

        {/* Sidebar Menu */}
        <nav className="relative z-10 flex-1">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-6 ml-2">Main Menu</p>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.to}
                  end={item.to === "/dashboard"}
                  className={({ isActive }) =>
                    `group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold text-sm tracking-tight ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-white/20"
                        : "text-gray-400 hover:bg-white/5 hover:text-blue-400 border border-transparent hover:border-white/5"
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </div>
                  <FiChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer Card */}
        <div className="relative z-10 mt-auto pt-8">
            <div className="p-5 bg-gradient-to-br from-blue-600/10 to-transparent border border-white/5 rounded-[1.5rem] overflow-hidden group">
                <div className="relative z-10">
                    <p className="text-xs font-black text-white mb-1">PRO Access</p>
                    <p className="text-[10px] text-gray-400 mb-3">Manage all premium news filters and user roles.</p>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-[85%] h-full bg-blue-600 rounded-full"></div>
                    </div>
                </div>
                {/* Decorative circle */}
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-blue-600/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            </div>
            
            <p className="text-center text-[10px] text-gray-600 mt-6 font-bold uppercase tracking-widest">
              © 2026 NewsIque Portal
            </p>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;