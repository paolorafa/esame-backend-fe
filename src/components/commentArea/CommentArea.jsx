import React from 'react'



function CommentArea({ comment,onDeleteComment}) {

  const handleDeleteClick = () => {
    onDeleteComment();
  };


  return (
    <>
      <div className="container d-flex justify-content-between my-scroll  ">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Commento</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{comment}</td>
              <td>
                <button onClick={handleDeleteClick}>Elimina</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default CommentArea