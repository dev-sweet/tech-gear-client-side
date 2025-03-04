import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import { useAuth } from "../../../hooks/useAuth";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [cart] = useCart();
  const { user } = useAuth();
  const price = cart?.reduce((total, item) => total + item.price, 0);
  console.log(price);
  // create a payment intent
  useEffect(() => {
    if (price) {
      axiosSecure
        .post("/create-payment-intent", { price })
        .then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    // create a payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      setError(error.message);
    } else {
      console.log("paymentMethod", paymentMethod);
      setError("");
    }

    // confirm payment with card

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: "unknown",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      Swal.fire({
        title: confirmError?.type || "Something went wrong!",
        text: confirmError?.message,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (paymentIntent) {
      setTransactionId(paymentIntent.id);
      const paymentInfo = {
        name: user?.displayName,
        email: user?.email,
        phone: "",
        cartIds: cart.map((item) => item._id),
        menuIds: cart.map((item) => item.id),
        date: new Date(),
        price,
        transactionId: paymentIntent.id,
        status: "pending",
      };

      axiosSecure.post("/payments", paymentInfo).then((res) => {
        console.log(res.data);
        console.log("inserted id", res.data.result.insertedId);
        console.log("deletedCount", res.data.deleteResult.deletedCount);
        if (
          res.data?.result?.insertedId &&
          res.data?.deleteResult?.deletedCount > 0
        ) {
          // console.log(data);
          Swal.fire({
            title: "Payment Success !",
            text: "Your payment is successfull!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border border-[#07174e] p-4 ">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <p className="text-red-500">{error}</p>
      {stripe ? (
        <button
          className="bg-[#07174e] text-white px-8 py-3 rounded rounded-sm mt-4"
          type="submit"
        >
          Pay
        </button>
      ) : (
        <button
          className="bg-gray-300 px-8 py-3 rounded rounded-sm mt-4"
          type="submit"
          disabled
        >
          Pay
        </button>
      )}

      {transactionId && (
        <p className="text-[#07174e]">Your transaction id is:{transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
