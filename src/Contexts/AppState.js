import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import AppContext from './AppContext';

const AppState = (props) => {
    const [subjectItems, setSubjectItems] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [searching, setSearching] = useState(false);
    const [currentSubjectName, setCurrentSubjectName] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() =>{
        setSubjectItems([]);
        const locate = window.location.href;
        const word = locate.split("/").splice(-1);
        if(word[0].length>0){
            const temp1 = word[0].split("_").join(" ");
            
            const temp = temp1[0].toUpperCase() + temp1.slice(1);
            setCurrentSubjectName(temp);
            getSubjectItems(word[0]);
        }
    },[location]);

    const perPage = 10;

    const getSubjectItems = async (subject) => {
        const res = await fetch(`https://openlibrary.org/subjects/${subject}.json?limit=10`);
        const data = await res.json();
        setSubjectItems(data.works);

        if(data.works.length === 0){
            alert("No Data Found. Please try again!");
            navigate("/");
        }
    }

    const getItems = async (searchTerm) => {
        const res = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}&page=${currentPage}&limit=10`);
        const data = await res.json();

        setAllBooks(data.docs);
        // localStorage.setItem("AllBooks",JSON.stringify(data.docs));
        if(data.docs.length === 0){
            alert("No Data Found. Please try again!");
        }
        if(data.numFound % perPage === 0){
            setTotalPages(data.numFound/perPage);
        }
        else setTotalPages(Math.floor(data.numFound/perPage) + 1);

        setSearching(false);
        // setSearching(false);
    }


    const increasePageNum = async (searchTerm) => {
        setAllBooks([]);
        setSearching(true);
        const res = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}&page=${currentPage+1}&limit=10`);
        const data = await res.json();

        setAllBooks(data.docs);
        setCurrentPage(currentPage + 1);
        setSearching(false);
    }

    const decreasePageNum = async (searchTerm) => {
        setAllBooks([]);
        setSearching(true);
        const res = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}&page=${currentPage-1}&limit=10`);
        const data = await res.json();

        setAllBooks(data.docs);
        setCurrentPage(currentPage - 1);
        setSearching(false);
    }

  return (
    <AppContext.Provider value={{decreasePageNum, increasePageNum, currentPage, currentSubjectName, totalPages, setCurrentSubjectName, getSubjectItems, setAllBooks, subjectItems, allBooks, setAllBooks, getItems, perPage, searching, setSearching}}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppState;