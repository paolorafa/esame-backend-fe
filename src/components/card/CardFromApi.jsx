import React, { useState } from "react";
import TextArea from "../textArea/TextArea";
import Card from "react-bootstrap/Card";
import ModalComment from "../../modalComment/ModalComment";
import Button from "react-bootstrap/esm/Button";
import "./cardFromApi.css";

function CardFromApi({ title, category, images, id }) {
  const [modalShow, setModalShow] = useState(false);
  console.log(modalShow);

  const toggleModal = () => {
    setModalShow(!modalShow);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={images} className="my-img" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{category}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <TextArea> {id}</TextArea>

        <Button className="button" onClick={toggleModal}>
          {!modalShow ? "Leggi i Commenti" : ""}
        </Button>

        {modalShow && (
          <ModalComment
            commentId={id}
            modal={modalShow}
            setModal={setModalShow}
          />
        )}
        

      </Card.Footer>
    </Card>
  );
}

export default CardFromApi;
