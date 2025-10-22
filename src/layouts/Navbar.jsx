import { useState } from "react";
import { Menu, X, Search, User} from "lucide-react";
import { Link } from "react-router";
import useFetchCategories from "../hooks/useFetctCategories";
import useAuthContext from "../hooks/useAuthContext";

const Navbar = ({ onSelectCategory, onSearch }) => {
  const { user, logoutUser } = useAuthContext();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = useFetchCategories();
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onSelectCategory?.(value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-bold text-blue-600 dark:text-blue-400 font-serif"
          >
            NEWS<span className="text-gray-800 dark:text-gray-100">IQUE</span>
          </Link>

          {/* Search bar */}
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
              className="bg-blue-600 text-white px-3 py-2.5 rounded-r-md hover:bg-blue-700 cursor-pointer"
            >
              <Search size={18} />
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 text-sm text-gray-700 dark:text-gray-200">
            <Link
              to="/"
              onClick={() => {
                setSelectedCategory("");
                onSelectCategory?.("");
                setSearchQuery("");
                if (onSearch) onSearch("");
              }}
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Home
            </Link>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm rounded-md  py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <Link
              to="/trending"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Trending
            </Link>
            <Link
              to="/about"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              About
            </Link>



            {/* Profile Dropdown */}
            <div>
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <User size={20} />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg">
                      <Link to='/profile' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Profile
                      </Link>
                      <Link to='/dashboard' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Dashboard
                      </Link>
                      <a
                        onClick={logoutUser}
                        className="block px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Logout
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link to="/login" className="btn bg-blue-600 text-white">
                    Login
                  </Link>
                  <Link to="/register" className="btn bg-blue-600 text-white">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 dark:text-gray-200 focus:outline-none"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md">
          <div className="px-4 pt-2 pb-3 space-y-2 text-gray-700 dark:text-gray-200">
            {["Home", "Trending", "Contact"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="block hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => {
                  if (item === "Home") {
                    setSelectedCategory("");
                    onSelectCategory?.("");
                    setSearchQuery("");
                    if (onSearch) onSearch("");
                  }
                  setMenuOpen(false); // Mobile menu close
                }}
              >
                {item}
              </Link>
            ))}

            {/* Category Dropdown */}
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

            {/* Mobile Search */}
            <div className="flex items-center mt-3">
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



            {/* Profile */}
            <div>
              {user ? (
                <div className="flex items-center justify-between mt-3 border-t dark:border-gray-700 pt-2">
                  <span>User</span>
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                    <User size={20} />
                  </div>
                </div>
              ) : (
                <div className="flex gap-7">
                  <Link className="btn bg-blue-600 text-white" to="/login">
                    Login
                  </Link>
                  <Link className="btn bg-blue-600 text-white" to="/register">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
