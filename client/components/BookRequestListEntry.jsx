import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/myLibraryActions';

export const BookRequestListEntry = class BookRequestListEntry extends React.Component{
  render(){
    return <li>
      <p>{this.props.username} wants to borrow:</p>
      <p>{this.props.title}</p>
      BookRequestId: {this.props.BookRequestId}
      <button onClick={() =>{ this.props.acceptBookRequest(this.props.BookRequestId)}}>Accept</button>
      <button onClick={() =>{ this.props.rejectBookRequest(this.props.BookRequestId)}}>Reject</button>
      <img src={this.props.image}/>
    </li>
  }
}

function mapStateToProps(state){
  return {}
}

export const BookRequestListEntryContainer = connect(
  mapStateToProps, 
  actionCreators
)(BookRequestListEntry);