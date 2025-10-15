import { useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { Outlet } from 'react-router';

const MainLayout = () => {
    const [selectedCategory, setSelectedCategory] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <div>
            <Navbar  onSelectCategory={setSelectedCategory} onSearch={setSearchQuery} />
            <Outlet context={{ selectedCategory,searchQuery }}/>
            <Footer/>
        </div>
    );
};

export default MainLayout;


