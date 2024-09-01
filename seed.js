const mongoose = require("mongoose");
const Task = require("./models"); // Ensure this path is correct

const mongoURI = "mongodb://localhost:27017/todo-list-app"; // Update as needed for your MongoDB setup

async function seedDB() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    console.log("Deleting existing data...");
    await Task.deleteMany({}); // Clear existing task data

    console.log("Inserting new data...");
    const tasks = [
      {
        title: "Buy groceries",
        completed: false,
      },
      {
        title: "Clean the house",
        completed: true,
      },
      {
        title: "Finish homework",
        completed: false,
      },
      {
        title: "Read a book",
        completed: true,
      },
    ];

    await Task.insertMany(tasks);

    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err.message);
  } finally {
    await mongoose.connection.close();
  }
}

seedDB();
