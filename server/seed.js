const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const User = require("./models/User");

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await User.deleteMany({});
    console.log("Cleared existing users");

    const adminUser = new User({
      name: "Admin User",
      email: "admin@email.com",
      password: "12345",
      role: "admin",
    });

    const regularUser = new User({
      name: "Regular User",
      email: "user@email.com",
      password: "67890",
      role: "user",
    });

    await adminUser.save();
    await regularUser.save();

    console.log("Created 2 users");
    console.log("\nLogin Credentials:");
    console.log(" Admin: admin@email.com / 12345");
    console.log(" User:  user@email.com / 67890");

    const users = await User.find({}, "email role");
    console.log("\nUsers in database:", users);
  } catch (error) {
    console.error("Seeding error:", error.message || error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

seedDatabase();
