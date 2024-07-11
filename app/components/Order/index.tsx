"use client";
import { Fade } from "react-awesome-reveal";
import Image from "next/image";
import { MouseEventHandler } from "react";

export default function Order() {
  const makePayment = async () => {
    console.log("here...");
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const data = await fetch("/api/payment", { method: "POST" }).then((t) =>
      t.json()
    );
    console.log(data);
    var options = {
      key: process.env.RAZORPAY_KEY || "rzp_test_Zs9aa7qSq0OqZq", // Enter the Key ID generated from the Dashboard
      name: "Tiffinwala",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for your purchase",
      image: "",
      handler: function (response: {
        razorpay_payment_id: any;
        razorpay_order_id: any;
        razorpay_signature: any;
      }) {
        // Validate payment at server - using webhooks is a better idea.
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "tiffinwala",
        email: "tiffinwala@gmail.com",
        contact: "9999999999",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  return (
    <div id="home-section" className="bg-lightpink">
      <div className="mx-auto max-w-7xl pt-20 sm:pb-24 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 space-x-1">
          <div className="col-span-6 flex flex-col justify-center">
            <Fade
              direction={"up"}
              delay={400}
              cascade
              damping={1e-1}
              triggerOnce={true}
            >
              <h1 className="text-4xl lg:text-7xl font-semibold mb-5 text-lightgrey md:4px lg:text-start text-center">
                Place your Order
              </h1>
            </Fade>
            <Fade
              direction={"up"}
              delay={800}
              cascade
              damping={1e-1}
              triggerOnce={true}
            >
              <p className="text-grey lg:text-lg font-normal mb-10 lg:text-start text-center">
                Fill up the information and make payment. After confirming your
                oder, We will deliver you{" "}
              </p>
            </Fade>
            {/* <form id="order-form" method="post" action="/process-order.php"> */}{" "}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="number-of-orders"
                className="text-sm font-medium text-gray-700"
              >
                Number of Orders:
              </label>
              <input
                type="number"
                id="number-of-orders"
                name="number_of_orders"
                min="1"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Your Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="address"
                className="text-sm font-medium text-gray-700"
              >
                Delivery Address:
              </label>
              <textarea
                id="address"
                name="address"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="mobile-number"
                className="text-sm font-medium text-gray-700"
              >
                Mobile Number:
              </label>
              <input
                type="tel"
                id="mobile-number"
                name="mobile_number"
                pattern="[0-9]{10}"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="flex justify-end text-xl font-medium bg-bgpink text-pink py-4 px-4 lg:px-8 navbutton rounded-full hover:text-white hover:bg-pink"
            >
              Place Order
            </button>
            <button
              className="bg-gradient-to-r from-[#2E3137] to-[#1D2328] rounded-md w-full py-4 shadow-xl drop-shadow-2xl text-gray-300 font-bold"
              onClick={makePayment}
            >
              Purchase Now!
            </button>
            {/* </form> */}
          </div>

          <div className="col-span-6 flex justify-center relative">
            <div className="flex bg-white p-2 gap-5 items-center bottom-10 left-10 rounded-xl absolute">
              <Image
                src={"/images/Banner/pizza.svg"}
                alt="pizza-image"
                width={68}
                height={68}
              />
              <p className="text-lg font-normal">
                More than 500+ <br /> recipes.
              </p>
            </div>
            <Image
              src="/images/Banner/banner-image.png"
              alt="nothing"
              width={1000}
              height={805}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
