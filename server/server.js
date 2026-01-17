const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/database");

const AuthRoute = require("./routes/AuthRoute");
const EntityRoutes = require("./routes/EntityRoute");
const ActivityRoute = require("./routes/ActivityRoute");


// env connect
dotenv.config();

// mongodb connection
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route strats here
app.use("/api/auth", AuthRoute);
app.use("/api/entities", EntityRoutes);
app.use("/api/activities", ActivityRoute);

//initial route
app.get("/", (req, res) => {
  res.json({ message: "Server running successfully" });
});

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
