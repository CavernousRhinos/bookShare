import React from 'react';
import Slider from 'react-slick';
import {BookListEntryContainer} from './BookListEntry';

class BookList extends React.Component{
  getSettings() {
    return {
      dots: true,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 2
    };
  }
  render(){

    return (
    <div className="book-list">
      <Slider {...this.getSettings()}>{this.props.books ? this.props.books.map((book) => {
        return <BookListEntryContainer {...book} key={book.id} />
      }) : null}</Slider>
    </div>);
  }
}

export default BookList;