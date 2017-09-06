import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
class ListBooks extends React.Component {
  static propTypes = {
    books: PropTypes.object.isRequired
  }

  componentDidMount() {
    //console.log(this.props.books)
  }

  render() {
    const {books, onSelfChange} = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object
              .keys(books)
              .map((key) => (
                <div className="bookshelf" key={books[key].Title}>
                  <h2 className="bookshelf-title">
                    {books[key].Title}</h2>
                  <div className="bookshelf-books"></div>

                  <ol className="books-grid">
                    {books[key]
                      .books
                      .map((detail, i) => (

                        <li key={detail.id}>
                          <div className="book">
                            <div className="book-top">
                              
                              <div
                                className="book-cover"
                                style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${detail.imageLinks.thumbnail})`
                              }}></div>
                              <div className="book-shelf-changer">
                                <select onChange={(e) => onSelfChange(detail, e.target.value)} value={detail.shelf}>
                                  <option value="none" disabled>Move to...</option>

                                  <option value="currentlyReading" >Currently Reading</option>

                                  <option value="wantToRead" >Want to Read</option>

                                  <option value="read" >Read</option>

                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{detail.title}</div>
                            <div className="book-authors">{detail
                                .authors
                                .join()}</div>
                          </div>
                        </li>
                      ))}
                  </ol>

                </div>
              ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book
          </Link>
        </div>
      </div>
    )
  }
}

export default ListBooks;