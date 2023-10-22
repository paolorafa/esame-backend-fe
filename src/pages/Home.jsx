import React from "react";
import Navigation from "../components/navabar/Navigation";
import ModalForm from "../components/modal/ModalForm";
import Jumbotron from "../components/jumbotron/Jumbotron";
import Body from "../components/body/Body";
import useSession from "../hook/useSession";
import { DocsContex } from "../contex/DocsContex";

function Home() {
  const session = useSession();
  console.log(session);

  return (
    <>
      <Navigation />
      <Jumbotron />
      <DocsContex>
        <Body />
        <div className="d-flex justify-content-center">
          <ModalForm />
        </div>
      </DocsContex>
    </>
  );
}

export default Home;
