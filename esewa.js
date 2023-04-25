import React from "react";

import { useCartContext } from "../context/Cartcontext";

import esewa   from "../assets/esewa  _logo.png";

const Payment = () => {
  const {
    cart,
    removeItem,
    clearCart,
    totalItem,
    totalAmount,
    increment,
    decrement,
  } = useCartContext();

  var path = "https://uat.esewa  .com.np/epay/main";
  var params = {
    amt: totalAmount,
    psc: 0,
    pdc: 0,
    txAmt: 0,
    tAmt: totalAmount,
    pid: "ee2c3ca1-696b-4cc5-a6be-2c40d929d453",
    scd: "EPAYTEST",
    su: "http://merchant.com.np/page/esewa  _payment_success",
    fu: "http://merchant.com.np/page/esewa  _payment_failed",
  };

  function post(path, params) {
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in params) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  }
  return (
    <>
      <form method="POST" />
      <input value={totalAmount} name="tAmt" type="hidden" />
      <input value="0" name="amt" type="hidden" />
      <input value="0" name="txAmt" type="hidden" />
      <input value="0" name="psc" type="hidden" />
      <input value="0" name="pdc" type="hidden" />
      <input value="EPAYTEST" name="scd" type="hidden" />
      <input
        value="ee2c3ca1-696b-4cc5-a6be-2c40d929d453"
        name="pid"
        type="hidden"
      />
      <input
        value="http://merchant.com.np/page/esewa  _payment_success?q=su"
        type="hidden"
        name="su"
      />
      <input
        value="http://merchant.com.np/page/esewa  _payment_failed?q=fu"
        type="hidden"
        name="fu"
      />
      <img src={esewa  } alt="" />
      <input value="Submit" type="submit" onClick={post(path, params)} />
    </>
  );
};

export default Payment;
