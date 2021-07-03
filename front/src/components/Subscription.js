import React from "react";
import StripeContainer from "./subscription/StripeContainer";
import { Redirect } from "react-router-dom";

const Subscription = () => {
  const session=JSON.parse(localStorage.getItem("session"));

  if(!session)
    return <Redirect to="/login" />;
  else if(session["customerId"]&&session["subscriptionId"])
    return <Redirect to="/dashboard" />;

  return (
    <>
      <StripeContainer />
    </>
  );
};

export default Subscription;