import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

function TextArea(props) {
  const [comment, setComment] = useState(null);
  const [input, setInput] = useState({
    comment: "",
    rate: 0,
  });

  const handleTextPostComment = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  console.log(input);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/comments/create`,
        {
          method: "POST",
          body: JSON.stringify(input),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response && response.ok) {
        const data = await response.json();
        setComment(data);
        window.location.reload();
        return data;
      } else {
        // Gestione dell'errore
        throw new Error("Errore nella richiesta POST");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {comment ? (
        <div>
          <p>commento inviato</p>
        </div>
      ) : (
        <form
          className="mb-3"
          enctype="multipart/form-data"
          onSubmit={postComment}
        >
          <Form.Label>
            <span>Scrivi il commento</span>
          </Form.Label>

          <Form.Control
            as="textarea"
            rows={3}
            name="comment"
            type="txt"
            onChange={handleTextPostComment}
          />
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>
              <span>Voto da 1 a 5</span>
            </Form.Label>

            <Form.Control
              rows={3}
              name="rate"
              type="number"
              placeholder="valutation"
              onChange={handleTextPostComment}
            />
          </Form.Group>
          <Button type="submit">Invia commento</Button>
        </form>
      )}
    </>
  );
}

export default TextArea;
