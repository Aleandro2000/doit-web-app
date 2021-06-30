import React from "react";
import StripeContainer from "../subscription/StripeContainer";
import { Redirect } from "react-router-dom";

const Subscription = () => {
  const session=localStorage.getItem("session");

  if(!session)
      return <Redirect to="/login" />;

  return (
    <>
      <StripeContainer />
    </>
  );
};

export default Subscription;