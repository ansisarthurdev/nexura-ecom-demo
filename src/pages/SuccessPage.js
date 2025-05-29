import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import { Button } from "@radix-ui/themes";
import { CheckCircle } from "@phosphor-icons/react";

const PaymentSuccessPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear the cart when payment is successful
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="max-w-[800px] mx-auto py-16 px-6 text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle size={64} weight="fill" className="text-green-500" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Thank You For Your Order!</h1>
      <p className="text-gray-600 mb-8">
        Your payment was successful and your order is being processed. You will
        receive an email confirmation shortly.
      </p>
      <Link to="/">
        <Button radius="medium" className="bg-gray-800">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
};

export default PaymentSuccessPage;
