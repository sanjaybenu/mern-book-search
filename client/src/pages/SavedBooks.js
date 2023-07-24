import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
//import useQuery, useMutation, queries and mutations
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";
import { removeBookId } from "../utils/localStorage";

import Auth from "../utils/auth";
const SavedBooks = () => {
  //use query and mutations
  const { loading, data } = useQuery(QUERY_ME);

  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  let userData = data?.me || {};

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(token);
    if (!token) {
      return false;
    }

    try {
      console.log(bookId);
      const { data } = await removeBook({
        variables: { bookId: bookId },
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
                  <Card border="dark" key={book.bookId}>
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
