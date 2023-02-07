import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../Contexts/AppContext';
import Subjects from '../Subjects/Subjects';
import "./Home.css";
import BooksTable from '../BooksTable/BooksTable';
import Loader from '../Loader/Loader';

const Home = () => {
    const context = useContext(AppContext);
    const { allBooks, getItems, perPage, setSearching, searching, setAllBooks, currentPage, totalPages, decreasePageNum, increasePageNum } = context;

    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (searchTerm.length > 0) {
                setAllBooks([]);
                setSearching(true);
                getItems(searchTerm);
            }
            else alert("Please enter any title name or author name!");
        }
    }


    return (
        <div className='home-container'>
            <div className='subjects'>
                <Subjects />
            </div>

            <div className='main-list'>

                <div className='books-search'>
                    <input type="search" onChange={handleChange} onKeyDown={handleKeyPress} className="search-bar books-search-bar" placeholder='Search by title or author and press Enter' />
                </div>
                <div className='books-container'>
                    {searching === true && allBooks.length === 0 ?
                        <Loader/>
                        :
                        searching === false && allBooks.length > 0 ?
                        <BooksTable searchTerm={searchTerm}/>
                        :
                        <div className='search-anything'>Search anything</div>
                    }
                </div>

            </div>
        </div>
    )
}

export default Home;