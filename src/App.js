import React from 'react'
import {Route} from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: {
      'currentlyReading': {
        'Title': 'Currently Reading',
        'books': []
      },
      'wantToRead': {
        'Title': 'Want To Read',
        'books': []
      },
      'read': {
        'Title': 'Read',
        'books': []
      }
    },
    showSearchPage: false
  }
  componentDidMount() {
    BooksAPI
      .getAll()
      .then((books) => {
        let _books = {
          'currentlyReading': {
            'Title': 'Currently Reading',
            'books': []
          },
          'wantToRead': {
            'Title': 'Want To Read',
            'books': []
          },
          'read': {
            'Title': 'Read',
            'books': []
          }
        }
        //console.log(books);
        for (let index in books) {
          switch (books[index].shelf) {
            case 'currentlyReading':
              _books
                .currentlyReading
                .books
                .push(books[index]);
              break;
            case 'wantToRead':
              _books
                .wantToRead
                .books
                .push(books[index]);
              break;
            case 'read':
              _books
                .read
                .books
                .push(books[index]);
              break;
            default:
              break;
          }
        }
        this.setState({books: _books})
      })

  }
  getBookShelf(id) {
    let shelf = "none"
    for (let key in this.state.books) {
      for (let i in this.state.books[key].books) {
        if (this.state.books[key].books[i].id === id) {
          shelf = this.state.books[key].books[i].shelf;
          break;
        }
      }
    }
    return shelf;
  }

  onSearchbookSelect(detail, toshelf) {
    if (detail.shelf !== undefined) {
      BooksAPI
        .update(detail, toshelf)
        .then(res => {
          //added from search page
          let _books = this.state.books;

          for (let key in _books) {

            _books[key].books = _books[key]
              .books
              .filter(key => key.id !== detail.id);

          }
          detail.shelf = toshelf;
          _books[toshelf]
            .books
            .push(detail);
          this.setState({books: _books});
        });
    }
  }
  onSelfChange(detail, toshelf) {
    BooksAPI
      .update(detail, toshelf)
      .then(res => {
        let _books = this.state.books;
        if (detail.shelf !== toshelf) {
          // if moved from book list page
          let _currentShelf = detail.shelf;
          _books[_currentShelf].books = _books[_currentShelf]
            .books
            .filter(key => key.id !== detail.id);
          detail.shelf = toshelf;
          if (_books[toshelf] !== undefined) {
            _books[toshelf]
              .books
              .push(detail);
          }

          this.setState({books: _books});
        }
      });
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path='/'
          render={() => (<ListBooks
          onSelfChange={this
          .onSelfChange
          .bind(this)}
          books={this.state.books}/>)}/>
        <Route
          path='/search'
          render={({history}) => (<SearchBooks
          getBookShelf={this
          .getBookShelf
          .bind(this)}
          onSelfChange={this
          .onSearchbookSelect
          .bind(this)}/>)}/>
      </div>
    )
  }
}

export default BooksApp

// {this.state.showSearchPage ? (       ) : (       )}