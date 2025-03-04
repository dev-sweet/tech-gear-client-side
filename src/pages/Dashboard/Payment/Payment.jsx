import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_APP_Payment_Gateway_PK);

const Payment = () => {
  return (
    <div>
      <h2 className="text-3xl text-center pb-5">Checkout</h2>
      <Elements stripe={stripePromise}>
        <div className="lg:max-w-[500px]">
          <CheckoutForm />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
