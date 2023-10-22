import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import jwtDecode from "jwt-decode";


function FormApi() {
  
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    category: "",
    title: "",
  });
  console.log(file);
  const handlersChangedFile = (e) => {
    setFile(e.target.files[0]);
  };

  console.log(formData);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    const token = localStorage.getItem("loggedIn");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    console.log(userId);
    e.preventDefault();
    if (file) {
      try {
        const fileUploadCover = await uploadFile(file);
        console.log("fileUploadCover:", fileUploadCover);
        if (fileUploadCover && fileUploadCover.images) {
          const finalBody = {
            ...formData,
            author: userId,
            images: fileUploadCover.images,
          };
          console.log(finalBody);

          const response = await fetch(
            `${process.env.REACT_APP_URL}/posts/create`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify(finalBody),
            }
          );
          
          if (response && response) {
            const responseData = await response.json();    
            window.location.reload();
            return responseData;
            
          }
        } else {
          console.log(
            'Errore durante l\'upload del file. Il campo "images" è mancante nei dati restituiti.'
          );
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("Seleziona un file, per favore.");
    }
  };

  const uploadFile = async (images) => {
    const fileData = new FormData();
    fileData.append("images", images);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/posts/cloudUpload`,
        {
          method: "POST",
          body: fileData,
        }
      );
      console.log(fileData);
      if (!response.ok) {
        throw new Error(
          `Errore durante l'upload del file. Codice di stato: ${response.status}`
        );
      }

      return await response.json();
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <form enctype="multipart/form-data" onSubmit={onSubmit}>
      <Row className="mb-3">
        <Form.Label className="fw-bolder">Category</Form.Label>
        <Form.Control
          required
          type="text"
          name="category"
          placeholder="category"
          onChange={handleInput}
        />

        <Form.Label className="fw-bolder">Title</Form.Label>
        <Form.Control
          required
          type="text"
          name="title"
          placeholder="title"
          onChange={handleInput}
        />

        <Form.Label className="fw-bolder">Immagine</Form.Label>

        <Form.Control
          type="file"
          name="images"
          placeholder="cover"
          onChange={handlersChangedFile}
        />
      </Row>

      <Button type="submit" className="center">
        Invia il Post
      </Button>
    </form>
  );
}

export default FormApi;
