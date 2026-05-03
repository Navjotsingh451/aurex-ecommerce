const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errormiddleware");
const authRoutes = require("./routes/authroute");
const productRoutes = require("./routes/productroute");
const orderRoutes = require("./routes/orderroute");
const heroRoutes = require("./routes/heroroute");
const cartRoutes = require("./routes/cartroute");

dotenv.config();
connectDB();

const app = express();

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(express.json());

app.use(
  cors({
    origin: process.env.VITE_API_URL,
    credentials: true,
  })
);

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.get("/", (req, res) => {
  res.send("AUREX SERVER IS RUNNING");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/cart", cartRoutes);

// Error Handlers (must be LAST)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});