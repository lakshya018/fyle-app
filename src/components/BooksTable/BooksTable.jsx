import React, {useContext} from 'react'
import AppContext from '../../Contexts/AppContext';

const BooksTable = ({searchTerm}) => {
    const context = useContext(AppContext);
    const { allBooks, currentPage, totalPages, decreasePageNum, increasePageNum } = context;

    return (
        <div >
            <div className='books-table'>
                <h2 className='books-search-heading'>{searchTerm[0].toUpperCase() + searchTerm.slice(1)}</h2>
                <table id='books-list'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Authors</th>
                            <th>Latest Published Year</th>
                            <th>First Published Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allBooks.map((book) => {
                                let allAuthors;
                                if (book.author_name) {
                                    allAuthors = book.author_name.map((author) => {
                                        return <div>{author}</div>
                                    });
                                }
                                else allAuthors = "N/A";

                                let latestPublishedYear;
                                if (book.publish_year) {
                                    latestPublishedYear = Math.max(...book.publish_year);
                                }
                                else latestPublishedYear = "N/A";

                                let firstPublishYear;
                                if (book.first_publish_year) {
                                    firstPublishYear = book.first_publish_year;
                                }
                                else firstPublishYear = "N/A";


                                return (
                                    <tr>
                                        <td>{book.title}</td>
                                        <td>{allAuthors}</td>
                                        <td>{latestPublishedYear}</td>
                                        <td>{firstPublishYear}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

            </div>



            <div className='pagination'>
                <button className="prev-btn" onClick={() => decreasePageNum(searchTerm)} disabled={currentPage === 1}>Prev</button>
                <span className='pages'>{currentPage} of {totalPages}</span>
                <button className="next-btn" onClick={() => increasePageNum(searchTerm)} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    )
}

export default BooksTable