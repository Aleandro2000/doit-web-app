import React from "react";
import StripeContainer from "../subscription/StripeContainer";
import { Redirect } from "react-router-dom";
import Session from "react-session-api";

const Subscription = () => {
  const session=Session.get("session");

  if(!session)
      return <Redirect to="/login" />;

  return (
    <>
      <StripeContainer />
    </>
  );
};

export default Subscription;