export const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const loadRazorpay = async (amount, setIsLoading, setCart) => {
  setIsLoading(true);
  const resh = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!resh) {
    alert("Failed to load Razorpay SDK. Are you online?");
    setIsLoading(false);
    return;
  }

  const res = await fetch(
    "https://treshop-backend-0n7w.onrender.com/payment/create-order",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    }
  );

  const data = await res.json();

  const options = {
    key: "rzp_test_i31RvOR7u7cW3M",
    amount: data.amount,
    currency: data.currency,
    name: "Treshop",
    description: "Thanks for your purchase from Treshop!",
    order_id: data.id,
    handler: () => setCart([]),
    theme: { color: "#ff8800" },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
  setIsLoading(false);
};
