import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_APP_Payment_Gateway_PK);

const Payment = () => {
  return (
    <div>
      <div className="lg:px-20 px-10 py-5 bg-gray-100 text-gray-700">
        <p className="font-semibold">/cart/checkout</p>
        <h3 className="text-center text-3xl font-semibold">Checkout</h3>
      </div>
      <Elements stripe={stripePromise}>
        <div className="lg:max-w-[1000px] mx-auto mt-5">
          <CheckoutForm />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
