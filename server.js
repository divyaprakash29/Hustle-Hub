const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const userRoutes = require("./service/routers/UserRoutes.js");
const freelancerRoutes = require("./service/routers/freelancerRoutes.js");
const projectRouter = require("./services/routes/ProjectRoutes.js");
const contractRoutes = require("./services/routes/ContractRoutes.js");
const bidRoutes = require("./services/routes/BidRoutes.js");
const clientRoutes = require("./services/routes/ClientRoutes.js");
const paymentRoutes = require("./services/routes/paymentRoutes.js");
const reviewRoutes = require("./services/routes/ReviewRoutes.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err.message);
    });

// Mount routes
app.use("/api", userRoutes);
app.use("/api", freelancerRoutes);
app.use("/api", projectRouter);
app.use("/api", contractRoutes);
app.use("/api", bidRoutes);
app.use("/api", clientRoutes);
app.use("/api", paymentRoutes);
app.use("/api", reviewRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
});

// Endpoint to create a payment intent working perfectly retain if error
app.post('/api/payment/create-payment-intent', async(req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            automatic_payment_methods: { enabled: true }, // Enable multiple payment methods
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'PaymentIntent creation failed' });
    }
});


// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});