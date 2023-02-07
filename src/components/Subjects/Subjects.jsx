import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AppContext from "../../Contexts/AppContext";
import { Link } from "react-router-dom";
import "./Subjects.css";

const Subjects = () => {
    const context = useContext(AppContext);
    const { getSubjectItems, subjectItems, setCurrentSubjectName} = context;

    const [searchSubject, setSearchSubject] = useState("");
    const navigate = useNavigate();

    const handleClick = (e) => {
        const subjectName = e.target.innerText.toLowerCase();
        const temp = subjectName[0].toUpperCase() + subjectName.slice(1);
        setCurrentSubjectName(temp);
        getSubjectItems(subjectName);
    }

    const handleChange = (e) =>{
        setSearchSubject(e.target.value);
    }

    const handleKeyPress = (e) =>{
        if(e.key === "Enter"){
            if(searchSubject.length>0){
                const subjectName = searchSubject.toLowerCase();
                const temp= subjectName.split(" ").join("_");
                getSubjectItems(temp);
                navigate(`/subjects/${temp}`);
                
            }
            else alert("Please enter a subject name!");
        }
    }
    return(
        <div>
            <h2 className="trending-subjects">Trending Subjects</h2>
            
            <div>
                <input type="search" className="search-bar subject-search-bar" onChange={handleChange} onKeyDown={handleKeyPress} placeholder="Search any subject and press Enter"/>
            </div>
            
            <div className="subjects-list">
                <Link to={`/subjects/javascript`} className="subject-name" ><h3 onClick={handleClick}>JavaScript</h3></Link>
                <Link to={`/subjects/love`}  className="subject-name" ><h3 onClick={handleClick}>Love</h3></Link>
                <Link to={`/subjects/mystery`}  className="subject-name"><h3 onClick={handleClick}>Mystery</h3></Link>
                <Link to={`/subjects/romance`}  className="subject-name"><h3 onClick={handleClick}>Romance</h3></Link>
                <Link to={`/subjects/thriller`}  className="subject-name"><h3 onClick={handleClick}>Thriller</h3></Link>
            </div>
            
        </div>
    )
}

export default Subjects;