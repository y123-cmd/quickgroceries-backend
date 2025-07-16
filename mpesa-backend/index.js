const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

const PORT = process.env.PORT || 5000;

app.post("/api/pay", async (req, res) => {
  const { phone, amount } = req.body;

  // 1. Get Access Token
  const auth = Buffer.from(`${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`).toString("base64");

  try {
    const tokenRes = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
      headers: { Authorization: `Basic ${auth}` },
    });

    const access_token = tokenRes.data.access_token;

    // 2. STK Push
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "").slice(0, 14);
    const password = Buffer.from(`${process.env.SHORTCODE}${process.env.PASSKEY}${timestamp}`).toString("base64");

    const stkRes = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: process.env.SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: process.env.SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: process.env.CALLBACK_URL,
        AccountReference: "QuickGroceries",
        TransactionDesc: "Order Payment",
      },
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    res.json({ success: true, data: stkRes.data });
  } catch (err) {
  console.error("ERROR RESPONSE:", err?.response?.data || err.message);
  res.status(500).json({ 
    success: false, 
    message: "Payment failed", 
    error: err?.response?.data || err.message 
  });
}
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
