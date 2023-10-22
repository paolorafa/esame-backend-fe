import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CommentArea from "../components/commentArea/CommentArea";
import { nanoid } from "nanoid";
import { PosteProvider } from "../contex/DocsContex";

function ModalComment(props) {
  const {post} = useContext(PosteProvider)
  console.log(post);
  const [commentData, setCommentData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(true);
  
  console.log(post.post.author);

  const handleClose = () => setShow(false);

  const getCommented = async () => {
    setLoaded(true);
    try {
      const rensponse = await fetch(`${process.env.REACT_APP_URL}/comments`);
      if (rensponse && rensponse.ok) {
        const data = await rensponse.json();
        setCommentData(data);
        console.log(data);
        setLoaded(false);
      }
      
    } catch (err) {
      setError(err);
    }
  };

const deleteComment=async (_id) => {

  try{
    const response = await fetch(`${process.env.REACT_APP_URL}/comments/delete/${_id}`, {
       method: 'DELETE',
       headers: {
        'content-type': 'application/json'
       }
    })
    console.log(response);
   if (response && response.ok){
    await getCommented()
   }
  } catch (err) {
    console.log(err);
  }
}

useEffect(() => {
  getCommented()
},[])


  return (
    <>
  

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loaded && <h1>Caricamento</h1>}
          {!loaded &&
            !error &&
            commentData.comment &&
            commentData.comment?.map((comment) => {
              return (
                <CommentArea
                  key={nanoid()}
                  comment={comment.comment}
                  onDeleteComment={() =>  deleteComment(comment._id)}
                />
              );
            })}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComment;
