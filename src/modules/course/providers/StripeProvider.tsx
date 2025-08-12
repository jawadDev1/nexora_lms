import { STRIPE_PUBLISH_KEY } from "@/constants";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { PROCESS_PAYMENT } from "../actions";
import { notifyError } from "@/utils/toast";
import { stripeAppearance } from "@/constants/stripe";

const StripeProvider = ({
  children,
  amount,
}: {
  children: React.ReactNode;
  amount: number;
}) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const result = await PROCESS_PAYMENT({
        amount: Math.trunc(amount * 100),
      });

      if (!result.success) {
        notifyError(result.message);
        return;
      }
      const secret = result.data?.client_secret;
      console.log("result =========> ", result);
      setClientSecret(secret as string);
      console.log("secret ==========> ", STRIPE_PUBLISH_KEY);
    })();
  }, []);

  if (!clientSecret) return null;

  return (
    <Elements
      options={{ clientSecret, appearance: stripeAppearance }}
      stripe={loadStripe(STRIPE_PUBLISH_KEY)}
    >
      {children}
    </Elements>
  );
};

export default StripeProvider;
