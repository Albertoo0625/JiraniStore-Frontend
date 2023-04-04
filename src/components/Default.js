import React from "react";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";

export default function Default(props) {
  console.log(props);

  return (
    <div className="container">
      <div className="row">
        <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
          <h1 className="display-3 text-danger">404</h1>
          <h1>error</h1>
          <h2>page not found</h2>
          <h3>
            the requested URL{" "}
            <span className="text-danger">"{props.location.pathname}"</span> was
            not found
          </h3>
          <Link to="/">
            <ButtonContainer>Back to HomePage</ButtonContainer>
          </Link>
        </div>
      </div>
    </div>
  );
}
