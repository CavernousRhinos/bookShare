import React from 'react';
import ReactTooltip from 'react-tooltip';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const BookListEntry = class BooksListEntry extends React.Component{
  formatDescription(){
    var description = this.props.description;
    // if(description && description.length > 400){
    //   return description.slice(0, 400) + ' ...more';
    // }
    return description;
  }
  getBookInfo(){
    var book = {};
    book.authors = this.props.authors,
    book.categories = this.props.categories,
    book.description = this.props.description,
    book.isbn10 = this.props.isbn10,
    book.isbn13 = this.props.isbn13,
    book.image = this.props.image,
    book.title = this.props.title
    return book;
  }
  render(){
    if(!this.props.hasOwnProperty('title')) return null;
    return <div className="book-entry">
      <img src={this.props.image} data-tip={
        "<div>" +
          "<p class='title'>" + this.props.title + "</p>" +
          "<p>" + this.formatDescription() + "</p>" +
        "</div>"
      } data-html="true" />
      <div className="owner-button">
        <p>{this.props.genre}</p>
        {this.props.borrower ?
          <p>Lent to: {this.props.borrower}</p> : null}
        {this.props.owner ?
        <p>Borrowed from: {this.props.owner}</p> : null}
        {this.props.searchedBook ?
          <button onClick={() => {this.props.addBookToMyShelf(this.getBookInfo()); }}>Add to my Library</button>
          : null}
        <div>
        { this.props.userId ?
            <p>Owner: {this.props.username}</p> : null}
        { this.props.userId ? <button onClick={
          () => this.props.borrowBook({bookId: this.props.id, ownerId: this.props.userId})
        }>Borrow book</button> : null }
       </div>
     </div>
      <ReactTooltip effect="solid" place="bottom"/>
    </div>;
  }
}
function mapStateToProps(){
  return {};
}

export const BookListEntryContainer = connect(
  mapStateToProps,
  actionCreators
)(BookListEntry);