import {searchGoogleBooksAJAX} from './searchBooks';
import {
  asyncSignIn,
  getMyBooksAJAX,
  getMyFriendsAJAX,
  searchUsersAJAX,
  makeFriendRequestAsync,
  getMyFriendRequests,
  acceptFriendRequestAJAX,
  createBookRequestAJAX,
  getExploreBooksAJAX,
  getBookRequestsToUserAJAX,
  acceptBookRequestAJAX} from './helpers/serverCalls';

export function setState(state){
  return {
    type: 'SET_STATE',
    state
  };
}
export function clearState(){
  return {
    type: 'CLEAR_STATE'
  }
}

/* -------- AUTHORIZATION ACTIONS -------- */

export function setPassword(password){
  return {
    type: 'SET_PASSWORD',
    password: password
  }
}

export function setPasswordConfirmation(password){
  return {
    type: 'SET_PASSWORD_CONFIRMATION',
    password: password
  }
}

export function setUsername(username){
  return {
    type: 'SET_USERNAME',
    username: username
  }
}

export function setEmail(email){
  return {
    type: 'SET_EMAIL',
    email: email
  }
}

export function regularLogin(){
  return {
    type: 'REGULAR_LOGIN'
  }
}

export function setToken(token){
  return {
    type: 'SET_TOKEN',
    token: token
  }
}

export function startRegularSignUp(){
  return {
    type: 'START_REGULAR_SIGNUP'
  }
}

export function finishRegularSignUp(token){
  return {
    type: 'FINISH_REGULAR_SIGNUP',
    token: token
  }
}

export function regularSignUp(){
  return {
    type: 'REGULAR_SIGNUP'
  }
}

export function startSignIn(username, password){
  return {
    type: 'START_SIGNIN',
    username: username,
    password: password
  }
}

export function endSignIn(token, username){
  return {
    type: 'END_SIGNIN',
    token: token,
    username: username
  }
}

export function regularSignIn(username, password){
  return function(dispatch){
    dispatch(startSignIn(username, password));
    return asyncSignIn(username, password, (res) => {
      dispatch(endSignIn(res.token, res.username));
    });
  }
}

export function facebookLogin(){
  return {
    type: 'FACEBOOK_LOGIN'
  }
}

/* -------- DASHBOARD ACTIONS  -------- */

export function setFoundBooks(foundBooks){
  return {
    type: 'SET_FOUND_BOOKS',
    foundBooks: foundBooks
  }
}

export function searchBooks(query){
  return {
    type: 'SEARCH_BOOKS',
    query: query
  }
}

/* Make friend request */
export function makeFriendRequest(email){
  return dispatch => {
    return makeFriendRequestAsync(email, (response) => {
      console.log(response);
    });
  }
}

/* Get friendRequests done to me */
export function startGettingFriendRequestToMe(){
  return {
    type: 'START_GETTING_FRIEND_REQUESTS_TO_ME',
  }
}

export function finishGettingFriendRequestToMe(friendRequests){
  return {
    type: 'FINISH_GETTING_FRIEND_REQUESTS_TO_ME',
    friendRequests: friendRequests
  }
}

export function getFriendRequestsDoneToMe(){
  console.log('STARTING TO FETCH FRIEND REQUESTS DONE TO ME');
  return dispatch => {
    dispatch(startGettingFriendRequestToMe());
    return getMyFriendRequests((friendRequests) => {
      dispatch(finishGettingFriendRequestToMe(friendRequests));
    });
  }
}

/* Get books that I own async actions */
export function getMyBooks(){
  return function (dispatch){
    dispatch(startGettingMyBooks());
    return getMyBooksAJAX((response)=> {
      dispatch(finishGettingMyBooks(response));
    })
  }
}

export function startGettingMyBooks(){
  return {
    type: 'START_GET_MY_BOOKS'
  }
}

export function finishGettingMyBooks(books){
  return {
    type: 'FINISH_GET_MY_BOOKS',
    books: books
  }
}

/* Get my friends async actions */
export function getMyFriends(){
  return function(dispatch){
    dispatch(startGettingMyFriends());
    return getMyFriendsAJAX((response) => {
      dispatch(finishGettingMyFriends(response));
    });
  }
}

export function startGettingMyFriends(){
  return {
    type: 'START_GET_MY_FRIENDS'
  }
}

export function finishGettingMyFriends(friends){
  return {
    type: 'FINISH_GET_MY_FRIENDS',
    friends: friends
  }
}

/* Search for friends async actions */
export function searchUsers(query){
  return function(dispatch){
    console.log('Searching friends with query: ' + query);
    dispatch(startSearchUsers(query));
    return searchUsersAJAX(query,(response) => {
      dispatch(finishSearchUsers(response));
    })
  }
}
export function startSearchUsers(query){
  return {
    type: 'START_SEARCH_USERS',
    query: query
  }
}

export function finishSearchUsers(users){
  return {
    type: 'FINISH_SEARCH_USERS',
    users: users
  }
}

/* addBookToMySheklf action */
export function addBookToMyShelf(book){
  return {
    type: 'ADD_BOOK_TO_SHELF',
    book: book
  }
}
/* Search for books async actions  */
export function requestBooks(query){
  console.log('REQUESTING BOOKS for query: ' + query);
  return {
    type: 'REQUEST_BOOKS',
    query: query
  }
}

export function receiveBooks(books){
  console.log('RECEIVING BOOKS');
  console.log(books);
  return {
    type: 'RECEIVE_BOOKS',
    books: books
  }
}

export function fetchBooks(query){
  return function(dispatch){
    dispatch(requestBooks(query));
    return searchGoogleBooksAJAX(query, (res) => {
      dispatch(receiveBooks(res));
    });
  }
}

/* Accept friend request Async */
export function acceptFriendRequest(friendRequestID){
  console.log('Accepting friend request ID:', friendRequestID);
  return function(dispatch){
    dispatch(startAcceptFriendRequest());
    return acceptFriendRequestAJAX(friendRequestID, (response) => {
      console.log('Accepted friend request');
      console.log(response);
      dispatch(finishAcceptFriendRequest());
    });
  }
}

export function startAcceptFriendRequest(){
  return {
    type: 'START_ACCEPT_FRIEND_REQUEST'
  }
}

export function finishAcceptFriendRequest(){
  return {
    type: 'FINISH_ACCEPT_FRIEND_REQUEST'
  }
}

/* Borrow book / Create Book Request async */
export function startBookRequest(){
  return {
    type: 'START_BOOK_REQUEST'
  }
}

export function finishBookRequest(){
  return {
    type: 'FINISH_BOOK_REQUEST'
  }
}

export function borrowBook(data){
  return function(dispatch){
    dispatch(startBookRequest(data));
    return createBookRequestAJAX(data, (response) => {
      console.log('MADE BOOK REQUEST');
      console.log(response);
      dispatch(finishBookRequest());
    });
  }
}

/* Get all books from my friends functions async */
export function startGettingExploreBooks(){
  return {
    type: 'START_GETTING_EXPLORE_BOOKS'
  }
}


export function finishGettingExploreBooks(books){
  return {
    type: 'FINISH_GETTING_EXPLORE_BOOKS',
    books: books
  }
}

export function getExploreBooks(){
  return function(dispatch){
    // dispatch(startGettingExploreBooks());
    return getExploreBooksAJAX((books) => {
      console.log('GOT BOOKS');
      console.log(books);
      dispatch(finishGettingExploreBooks(books));
    });
  }
}

/* Actions to get book requests done to me */
export function startGettingBookRequestsToUser(){
  return {
    type: 'START_GETTING_BOOK_REQUESTS_TO_USER'
  }
}


export function finishGettingBookRequestsToUser(bookRequests){
  return {
    type: 'FINISH_GETTING_BOOK_REQUESTS_TO_USER',
    bookRequests: bookRequests
  }
}

export function getBookRequestsToUser(){
  return function(dispatch){
    console.log('Starting to get bookRequestsToUser');
    dispatch(startGettingBookRequestsToUser());
    return getBookRequestsToUserAJAX((bookRequests) => {
      console.log('GOT REQUESTS');
      console.log(bookRequests);
      dispatch(finishGettingBookRequestsToUser(bookRequests));
    });
  }
}

/* Actions to accept book requests */
export function startAcceptingBookRequest(){
  return {
    type: 'START_ACCEPTING_BOOK_REQUEST'
  }
}


export function finishAcceptingBookRequest(){
  return {
    type: 'FINISH_ACCEPTING_BOOK_REQUEST'
  }
}

export function acceptBookRequest(requestId){
  return function(dispatch){
    console.log('Starting to ACCEPT bookRequests');
    dispatch(startAcceptingBookRequest());
    return acceptBookRequestAJAX(requestId, (bookRequests) => {
      console.log('ACCEPTED BOOK REQUEST');
      console.log(bookRequests);
      dispatch(finishAcceptingBookRequest(bookRequests));
    });
  }
}
