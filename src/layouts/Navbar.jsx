import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Link } from "react-router";
import useFetchCategories from "../hooks/useFetctCategories";
import useAuthContext from "../hooks/useAuthContext";

const Navbar = ({ onSelectCategory, onSearch }) => {
  const { user, logoutUser } = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { categories } = useFetchCategories();

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onSelectCategory?.(value);
    setMenuOpen(false);
  };

  const handleSearch = () => {
    onSearch?.(searchQuery);
    setMenuOpen(false);
  };

  const handleReset = () => {
    setSelectedCategory("");
    setSearchQuery("");
    onSelectCategory?.("");
    onSearch?.("");
    setMenuOpen(false);
  };



  return (
    <nav className="bg-gradient-to-br to-purple-50 from-blue-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-blue-600 dark:text-blue-400 font-serif">
            NEWS<span className="text-gray-800 dark:text-gray-100">IQUE</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center flex-grow max-w-md mx-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news..."
              className="w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-l-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-gray-100"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-3 py-2.5 rounded-r-md hover:bg-blue-700"
            >
              <Search size={18} />
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 text-sm text-gray-700 dark:text-gray-200">
            <Link to="/" onClick={handleReset} className="hover:text-blue-600 dark:hover:text-blue-400">
              Home
            </Link>

            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm rounded-md py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <Link to="/trending" className="hover:text-blue-600 dark:hover:text-blue-400">
              Trending
            </Link>
            <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400">
              About
            </Link>

            {/* Profile */}
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="User avatar"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                  <li><Link to="/">Home</Link></li>
                  {user && ["ADMIN","EDITOR"].includes(user.role) && ( 
                  <li><Link to="/dashboard">Dashboard</Link></li>
                  )}
                  <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/subscription/plan">Subscription</Link></li>
                  <li><a onClick={logoutUser}>Logout</a></li>
                </ul>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link to="/login" className="btn bg-blue-600 text-white">Login</Link>
                <Link to="/register" className="btn bg-blue-600 text-white">Register</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 dark:text-gray-200">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md transition-all duration-300">
          <div className="px-4 pt-2 pb-4 space-y-3 text-gray-700 dark:text-gray-200">
            {["Home", "Trending", "About"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="block hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => {
                  if (item === "Home") handleReset();
                  else setMenuOpen(false);
                }}
              >
                {item}
              </Link>
            ))}

            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-l-md px-3 py-1.5 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-3 py-2.5 rounded-r-md hover:bg-blue-700"
              >
                <Search size={18} />
              </button>
            </div>

            {/* Mobile Profile */}
            {user ? (
              <ul className="menu mt-3 p-2 shadow bg-base-100 rounded-box w-full border-t dark:border-gray-700 pt-2">
                <li><Link to="/">Home</Link></li>
                {["ADMIN","EDITOR"].includes(user.role) && ( 
                <li><Link to="/dashboard">Dashboard</Link></li>
                )}
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/subscription/plan">Subscription</Link></li>
                <li><a onClick={logoutUser}>Logout</a></li>
              </ul>
            ) : (
              <div className="flex gap-4 pt-2 border-t dark:border-gray-700">
                <Link to="/login" className="btn bg-blue-600 text-white w-full">Login</Link>
                <Link to="/register" className="btn bg-blue-600 text-white w-full">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;