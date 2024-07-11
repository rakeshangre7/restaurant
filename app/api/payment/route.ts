import { NextApiResponse } from "next";
import Razorpay from "razorpay";
import shortid from "shortid";

export async function POST(req: any, res: NextApiResponse<any>) {
  debugger;
  if (req.method === "POST") {
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: "rzp_test_Zs9aa7qSq0OqZq",
      key_secret: "o4GKqi5IXjg4v21gAaBuNDVX",
    });

    // Create an order -> generate the OrderID -> Send it to the Front-end
    // Also, check the amount and currency on the backend (Security measure)
    const payment_capture = 1;
    const amount = 499;
    const currency = "INR";
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      console.log(response);
      return new Response(JSON.stringify(response), { status: 200 });
      // res.status(200).json({
      //   id: response.id,
      //   currency: response.currency,
      //   amount: response.amount,
      // });
    } catch (err) {
      console.log(err);
      // res.status(400).json(err);
      return new Response("Error occured" + err, { status: 400 });
    }
  } else {
    // Handle any other HTTP method
  }
}
