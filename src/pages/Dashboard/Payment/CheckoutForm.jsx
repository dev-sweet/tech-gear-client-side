import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import payments from "../../../assets/payment-getways.png";
const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [cart] = useCart();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();
  const price = cart?.reduce((total, item) => total + item.price, 0);

  // create a payment intent
  useEffect(() => {
    if (price) {
      axiosSecure
        .post("/create-payment-intent", { price })
        .then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [price, axiosSecure]);

  // handle form submit
  const onSubmit = async (data) => {
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
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        cartIds: cart?.map((item) => item._id),
        productIds: cart?.map((item) => item.id),
        date: new Date(),
        price,
        transactionId: paymentIntent.id,
        status: "Pending",
      };

      axiosSecure.post("/payments", paymentInfo).then((res) => {
        if (
          res.data?.result?.insertedId &&
          res.data?.deleteResult?.deletedCount > 0
        ) {
          navigate("/dashboard/paymentHistory");
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-gray-800 text-2xl pb-5 font-semibold">
        Billing Information:
      </h2>
      <div className="grid md:grid-cols-2 gap-x-4">
        <div className="w-full flex flex-col justify-center gap-1">
          <label htmlFor="name">Full Name *</label>
          <input
            className="border-2 border-gray-400 focus:border-[#2b4190] w-full outline-none py-3 px-5"
            type="text"
            defaultValue={user?.displayName || ""}
            placeholder="Product Name"
            {...register("name", { required: true })}
          />

          <span
            className={`mt-[-5px] ${
              errors.name ? "text-[#ff0000d6]" : "text-[#ff000000]"
            }`}
          >
            Name is required!
          </span>
        </div>
        <div className="w-full flex flex-col justify-center gap-1">
          <label htmlFor="name">Email *</label>
          <input
            className="border-2 border-gray-400 focus:border-[#2b4190] w-full outline-none py-3 px-5"
            type="email"
            defaultValue={user?.email || ""}
            placeholder="Product Name"
            {...register("email", { required: true })}
          />

          <span
            className={`mt-[-5px] ${
              errors.email ? "text-[#ff0000d6]" : "text-[#ff000000]"
            }`}
          >
            Email is required!
          </span>
        </div>
        <div className="w-full flex flex-col justify-center gap-1">
          <label htmlFor="name">Phone *</label>
          <input
            className="border-2 border-gray-400 focus:border-[#2b4190] w-full outline-none py-3 px-5"
            type="text"
            // defaultValue={user?.email || ""}
            placeholder="Your Phone Number"
            {...register("phone", { required: true })}
          />

          <span
            className={`${
              errors.phone ? "text-[#ff0000d6]" : "text-[#ff000000]"
            }`}
          >
            Phone number is required!
          </span>
        </div>
        <div className="w-full flex flex-col justify-center gap-1">
          <label htmlFor="name">Address *</label>
          <input
            className="border-2 border-gray-400 focus:border-[#2b4190] w-full outline-none py-3 px-5"
            type="text"
            placeholder="Delivery Address"
            {...register("address", { required: true })}
          />

          <span
            className={`mt-[-5px] ${
              errors.address ? "text-[#ff0000d6]" : "text-[#ff000000]"
            }`}
          >
            Address is required!
          </span>
        </div>
      </div>
      <h2 className="text-gray-800 text-2xl font-semibold">
        Card Information:
      </h2>
      <div className="py-3">
        <img src={payments} alt="" />
      </div>
      <div className="border border-[#07174e] p-4">
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
      <div className="text-center">
        {stripe ? (
          <button
            className="bg-[#07174e] text-white px-8 py-3 rounded rounded-sm mt-4 cursor-pointer transition duration-2 hover:bg-[#010b2d]"
            type="submit"
          >
            Complete Order
          </button>
        ) : (
          <button
            className="bg-gray-300 px-8 py-3 rounded rounded-sm mt-4"
            type="submit"
            disabled
          >
            Complete Order
          </button>
        )}
      </div>

      {transactionId && (
        <p className="text-[#07174e]">Your transaction id is:{transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
