import axios from "axios";
const stripe = Stripe(
  "pk_test_51IdaCjSD22OeoCfzvUfHuhmecepHlndBeEZXuV6NvLFObAVg4gjbPkOTDREf1fau5lXuQyknmzK92kOL0f7J07hD0036IKX4EK"
);

export const bookTour = async (tourId) => {
  try {
    // Get checkut session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/booking/checkout-session/${tourId}}`
    );

    console.log(session);
    // create checkout form

    await stripe.redirectToCheckout({
      sessionId: session.data.sessionId,
    });
  } catch (err) {
    console.log(err);
    showAlert("error", err);
  }
};
