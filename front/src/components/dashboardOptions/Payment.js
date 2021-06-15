import React from "react";
import StripeContainer from "../payment/StripeContainer";
import { Redirect } from "react-router-dom";

const Payment = () => {
  const session=localStorage.getItem("session");

  if(!session)
      return <Redirect to="/login" />;

  return (
    <>
      <StripeContainer />
    </>
  );
};

export default Payment;