import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCart } from "../redux/slices/cartSlice";
import { removeFromCart, updateQuantity } from "../redux/slices/cartSlice";
import { Button } from "@radix-ui/themes";
import { TrashIcon } from "@phosphor-icons/react";
import Alert from "../components/dialogs/Alert";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CartPage = () => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("Success");
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate cart total
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle quantity change
  const handleQuantityChange = (id, color, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, color, quantity: newQuantity }));
  };

  // Handle remove from cart
  const handleRemoveFromCart = (id, color, name) => {
    dispatch(removeFromCart({ id, color }));

    // Show success alert
    setAlertTitle("Success");
    setAlertMessage(`${name} removed from cart!`);
    setAlertOpen(true);
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (cart.length === 0) {
      setAlertTitle("Warning");
      setAlertMessage("Your cart is empty");
      setAlertOpen(true);
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare the items for the backend
      const items = cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        color: item.color,
      }));

      // Call your PHP backend to create a Stripe checkout session
      const response = await fetch(
        process.env.REACT_APP_STRIPE_CHECKOUT_SESSION_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items,
            shipping: cartTotal >= 80 ? 0 : 10,
          }),
        }
      );

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      // Parse the response JSON
      const responseData = await response.json();

      if (!responseData.sessionId) {
        throw new Error("No session ID returned from the server");
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Failed to initialize Stripe");
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: responseData.sessionId,
      });

      if (error) {
        console.error("Stripe redirect error:", error);
        throw error;
      }
    } catch (error) {
      setAlertTitle("Error");
      setAlertMessage(`Payment processing failed: ${error.message}`);
      setAlertOpen(true);
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-screen">
      <div className="max-w-[1400px] px-6 py-8 mx-auto">
        <div className="flex items-center gap-2 flex-wrap mb-6">
          <Link
            to="/"
            className="text-gray-400 text-sm hover:text-gray-600 transition-all duration-300"
          >
            Home
          </Link>
          <span className="text-gray-400 text-sm">/</span>
          <span className="text-gray-800 text-sm">Shopping Cart</span>
        </div>

        <h1 className="text-3xl font-bold uppercase mb-8">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-6">Your cart is empty</p>
            <Link to="/">
              <Button radius="medium" className="bg-gray-800">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cart Items - Takes up 2/3 of the space on medium screens and up */}
            <div className="md:col-span-2">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.color}`}
                  className="flex flex-row items-start gap-4 border-b border-gray-200 py-6"
                >
                  <div className="w-24 h-24 bg-white flex items-center justify-center rounded-md">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="flex-grow">
                    <div className="flex gap-4 justify-between items-start w-full">
                      <div>
                        <Link to={`/${item.id}`}>
                          <h3 className="font-bold text-lg text-gray-700 uppercase">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-500 mb-2">
                          Color:{" "}
                          <span
                            style={{
                              color:
                                item.color === "burgundy"
                                  ? "#800020"
                                  : item.color,
                            }}
                          >
                            {item.color}
                          </span>
                        </p>
                        <p className="font-bold text-gray-900">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          handleRemoveFromCart(item.id, item.color, item.name)
                        }
                        className="text-gray-500 hover:text-red-500 transition-all duration-300 relative top-[2px]"
                        aria-label="Remove item"
                      >
                        <TrashIcon size={20} />
                      </button>
                    </div>

                    <div className="mt-4">
                      <span className="text-sm text-gray-500 mb-2">
                        Quantity:
                      </span>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded"
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              item.color,
                              item.quantity - 1
                            )
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded"
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              item.color,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary - Takes up 1/3 of the space on medium screens and up */}
            <div className="bg-gray-50 p-6 rounded-md h-fit">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>{cartTotal >= 80 ? "Free" : "$10.00"}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>
                      $
                      {(cartTotal >= 80 ? cartTotal : cartTotal + 10).toFixed(
                        2
                      )}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 block mt-1">
                    {cartTotal >= 80
                      ? "Free shipping applied"
                      : "Free shipping on orders over $80"}
                  </span>
                </div>
              </div>

              <Button
                radius="medium"
                className="w-full bg-gray-800 mt-6 text-white"
                onClick={handleCheckout}
                loading={isProcessing}
                disabled={isProcessing}
              >
                Proceed to Checkout
              </Button>

              <Link to="/">
                <Button
                  radius="medium"
                  variant="outline"
                  className="w-full mt-3 border-gray-300"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <Alert
        open={alertOpen}
        onOpenChange={setAlertOpen}
        title={alertTitle}
        description={alertMessage}
      />
    </div>
  );
};

export default CartPage;
