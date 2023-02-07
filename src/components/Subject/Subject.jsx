import React, { useContext, useEffect } from 'react'
import AppContext from '../../Contexts/AppContext';
import Subjects from '../Subjects/Subjects';
import "./Subject.css";
import Loader from '../Loader/Loader';
const Subject = () => {
    const context = useContext(AppContext);
    const { getSubjectItems, subjectItems, currentSubjectName, setCurrentSubjectName } = context;

    // useEffect(()=>{
    //     const location = window.location.href;
    //     const word = location.split("/").splice(-1);
    //     const temp = word[0][0].toUpperCase() + word[0].slice(1);
    //     setCurrentSubjectName(temp);
    //     getSubjectItems(word[0]);
    // })

    return (
        <div className='home-container'>
            <div className='subjects'>
                <Subjects />
            </div>

            <div className='main-list'>
                <div className='current-subject'>
                    <h1 >{currentSubjectName}</h1>
                </div>
                <div className='subject-table'>
                {
                    subjectItems.length === 0 ?
                        <Loader/>
                        // <h1>loadong</h1>
                        :
                        <table id='subject-list'>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>First Published Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    subjectItems.map((item) => {

                                        const allAuthors = item.authors.map((author) => {
                                            return <div>{author.name}</div>
                                        });

                                        return (
                                            <tr>
                                                <td>{item.title}</td>
                                                <td>{allAuthors}</td>
                                                <td>{item.first_publish_year}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>

                        </table>
                }

                </div>
                

            </div>
        </div>
    )
}

export default Subject;