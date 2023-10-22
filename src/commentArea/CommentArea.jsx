import React from "react";


const CommentArea = ({ comment, author, onDeleteComment }) => {
  const handleDeleteClick = () => {
    onDeleteComment();
  };

  return (
    <>
      <div className="container d-flex justify-content-between my-scroll  ">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Autore</th>
              <th scope="col">Commento</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{author}</td>
              <td>{comment}</td>
              <td>
                <button onClick={handleDeleteClick}>Elimina</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CommentArea;