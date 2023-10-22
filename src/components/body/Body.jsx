import React, {  useContext } from "react";
import CardFromApi from "../card/CardFromApi";
import Container from "react-bootstrap/Container";
import LatestRelais from "../pagination/LatestRelais";
import {PosteProvider } from "../../contex/DocsContex";



function Body() {
  const {post, loaded} = useContext(PosteProvider)
  

console.log(post);

  return (
    <>
      <Container className="d-flex gap-2">
        {loaded && <h1>caricamento</h1>}
        {!loaded &&
          post &&
          post.post?.map((element) => (
            <CardFromApi
              id={element._id}
              title={element.title}
              category={element.category}
              images={element.images}
              value={element.value}
            />
          ))}
      </Container>

      <LatestRelais />
    </>
  );
}

export default Body;
