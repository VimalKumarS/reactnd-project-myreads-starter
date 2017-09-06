import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
class SearchBooks extends React.Component {
state = { 
  books: []
}
componentDidMount() {
   this.setState({books: []})
}
GetImageUrl(detail){
return detail.imageLinks !== undefined ? detail.imageLinks.thumbnail : ''
  }
searchBook(query){
  if(query.trim() !==''){
  BooksAPI.search(query.trim(),20).then(res => {    
    this.setState({books: res})
  })}
  else{
    this.setState({books: []})
  }
}
onSelfChange(detail,shelf){
  console.log(detail);
  let _books = this.state.books.filter(key => key.id !== detail.id);
  this.setState({books:_books})
  this.props.onSelfChange(detail,shelf);
}
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
         Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input type="text" placeholder="Search by title or author"  onChange={(event) => this.searchBook(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
             {this.state.books
                      .map((detail, i) => (

                       <li key={detail.id}>
                          <div className="book">
                            <div className="book-top">
                               
                              <div
                                className="book-cover"
                                style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${this.GetImageUrl(detail)})`
                              }}></div>
                              <div className="book-shelf-changer">
                                <select onChange={(e) => this.onSelfChange(detail, e.target.value)} value="none">
                                  <option value="disable" disabled>Move to...</option>

                                  <option value="currentlyReading" >Currently Reading</option>

                                  <option value="wantToRead" >Want to Read</option>

                                  <option value="read" >Read</option>

                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{detail.title}</div>
                            <div className="book-authors">{detail.authors !== undefined ? detail.authors
                                .join() : detail.authors}</div>
                          </div>
                        </li>
                      ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;