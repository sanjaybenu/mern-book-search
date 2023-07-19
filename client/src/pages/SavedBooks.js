// // import React, { useState, useEffect } from "react";
// import React from "react";
// import { Container, Card, Button, Row, Col } from "react-bootstrap";

// import Auth from "../utils/auth";
// import { removeBookId } from "../utils/localStorage";
// // import { getMe, deleteBook } from "../utils/API";
// import { useQuery, useMutation } from "@apollo/client";
// import { GET_ME } from "../utils/queries";

// import { REMOVE_BOOK } from "../utils/mutations";
// const SavedBooks = () => {
//   const { loading, data } = useQuery(GET_ME);
//   console.log("data:", loading);
//   let userData = data?.me || {};
//   const [removeBook] = useMutation(REMOVE_BOOK);

//   const handleDeleteBook = async (bookId) => {
//     console.log(bookId);
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }

//     try {
//       const { user } = await removeBook({ variables: { bookId } });

//       // if (!response.ok) {
//       //   throw new Error("something went wrong!");
//       // }

//       userData = user;
//       console.log(userData);
//       // upon success, remove book's id from localStorage
//       removeBookId(bookId);
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <div fluid className="text-light bg-dark p-5">
//         <Container>
//           <h1>Viewing saved books!</h1>
//         </Container>
//       </div>
//       <Container>
//         <h2 className="pt-5">
//           {userData && userData.savedBooks && userData.savedBooks.length
//             ? `Viewing ${userData.savedBooks.length} saved ${
//                 userData.savedBooks.length === 1 ? "book" : "books"
//               }:`
//             : "You have no saved books!"}
//         </h2>
//         <Row>
//           {userData &&
//             userData.savedBooks &&
//             userData.savedBooks.map((book) => {
//               return (
//                 <Col md="4">
//                   <Card key={book.bookId} border="dark">
//                     {book.image ? (
//                       <Card.Img
//                         src={book.image}
//                         alt={`The cover for ${book.title}`}
//                         variant="top"
//                       />
//                     ) : null}
//                     <Card.Body>
//                       <Card.Title>{book.title}</Card.Title>
//                       <p className="small">Authors: {book.authors}</p>
//                       <Card.Text>{book.description}</Card.Text>
//                       <Button
//                         className="btn-block btn-danger"
//                         onClick={() => handleDeleteBook(book.bookId)}
//                       >
//                         Delete this Book!
//                       </Button>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               );
//             })}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default SavedBooks;

import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";
import { removeBookId } from "../utils/localStorage";

import Auth from "../utils/auth";
const SavedBooks = () => {
  const { loading, data } = useQuery(QUERY_ME);
  
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  let userData = data?.me || {};
 
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(token)
    if (!token) {
      return false;
    }

    try {
      console.log(bookId)
      const { data } = await removeBook({
        variables: {bookId: bookId, },
      });
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing {userData.username}'s books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedBooks?.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <div>
          <Row>
            {userData.savedBooks?.map((book) => {
              return (
                <Col md="4" key={book.bookId}>
                  <Card  border="dark" key={book.bookId}>
                    {book.image ? (
                      <Card.Img
                        src={book.image}
                        alt={`The cover for ${book.title}`}
                        variant="top"
                      />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{book.title}</Card.Title>
                      <p className="small">Authors: {book.authors}</p>
                      <Card.Text>{book.description}</Card.Text>
                      <Button
                        className="btn-block btn-danger"
                        onClick={() => handleDeleteBook(book.bookId)}
                      >
                        Delete this Book!
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default SavedBooks;
