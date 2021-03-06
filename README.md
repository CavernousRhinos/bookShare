# Book Share

**Book Share** allows users to connect through their love of reading by sharing their favorite books with friends.

## Table of Contents

1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
1. [Features](#features)
1. [Routes](#routes)
1. [Schema](#schema)
1. [Testing](#testing)
1. [Roadmap](#roadmap)
1. [Team](#team)
1. [Contributing](#contributing)

## Requirements

- React
- Node
- mySql

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
bower install

```

If you are using Mac OSX or Linux run

```sh
shell setup.sh
```

From the root directory, this script is assuming you have node and bower installed

### Features

* Secure sign-in with salting and hashing
* Google Books API Integration
* Implemented SASS as a preprocessor
* Generated Gruntfile to clean build files, transpile with webpack and generate style.css with SASS
* Implemented MySQL Database
* React front-end
* Redux integration on the front-end
* Implemented Node with Express library for the server

### Routes

| Route                       | Method | Controller      | Handler                    |
|-----------------------------|--------|-----------------|----------------------------|
| /api/friendRequests         | POST   | User Controller | addFriend                  |
| /api/friends                | GET    | User Controller | viewAllFriends             |
| /api/user/:id               | GET    | User Controller | getUser                    |
| /api/findFriends/:query     | GET    | User Controller | findFriends                |
| /api/friendRequests         | GET    | User Controller | getFriendRequests          |
| /api/acceptFriendRequest    | POST   | User Controller | acceptFriendRequest        |
| /api/deleteFriendRequest    | POST   | User Controller | deleteFriendRequest        |
| /api/friends/:id/books      | GET    | Book Controller | viewFriendBooks            |
| /api/books                  | GET    | Book Controller | addBook                    |
| /api/books                  | DELETE | Book Controller | viewMyShelf                |
| /api/friendsBooks/:id       | GET    | Book Controller | viewFriendBook             |
| /api/friendsBooks/:id       | GET    | Book Controller | deleteBook                 |
| /api/bookRequest            | POST   | Book Controller | makeBookRequest            |
| /api/deleteBookRequest      | POST   | Book Controller | deleteBookRequest          |
| /api/acceptBookRequest      | POST   | Book Controller | acceptBookRequest          |
| /api/myBookRequests         | GET    | Book Controller | getRequestedBooksToFriends |
| /api/myRequestedBooks       | GET    | Book Controller | getRequestedBooksToMe      |
| /api/lentBooks              | GET    | Book Controller | getLentBooks               |
| /api/borrowedBooks          | GET    | Book Controller | getBorrowedBooks           |
| /api/getAllBooksFromFriends | GET    | Book Controller | getAllBooksFromFriends     |
| /api/tradeRequests          | POST   | Book Controller | makeTradeRequest           |
| /api/deleteTradeRequest     | POST   | Book Controller | deleteTradeRequest         |
| /api/acceptTradeRequest     | POST   | Book Controller | acceptTradeRequest         |
| /api/completeTradeRequest   | POST   | Book Controller | completeTradeRequest       |
| /api/viewFriendBooks        | POST   | Book Controller | viewFriendBooks            |

### Schema

![Bookshare database schema](https://raw.githubusercontent.com/carlosyasu91/bookShare/styles2/images/schema.png "Bookshare Database Schema")

### Testing

Create bookshare_test database.

From within the root directory:
```cd``` into ```server``` directory and run the following to start testing.

```sh
mocha
```

### Roadmap

View the app roadmap [here](https://github.com/CavernousRhinos/bookShare/issues)

## Team

  [Yasu Flores](https://github.com/carlosyasu91)

  [Leorina Baybay](https://github.com/Aniroel)

  [Jonathan Blaising](https://github.com/jblza)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
