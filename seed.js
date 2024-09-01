const mongoose = require("mongoose");
const Task = require("./models"); // Ensure this path is correct
const { v4: uuidv4 } = require("uuid"); // Import uuid for generating unique IDs

const mongoURI = "mongodb://mongodb:27017/todo-app"; // Update as needed for your MongoDB setup

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
        id: uuidv4(), // Generate a unique id for each task
        title: "Buy groceries",
        completed: false,
      },
      {
        id: uuidv4(), // Generate a unique id for each task
        title: "Clean the house",
        completed: true,
      },
      {
        id: uuidv4(), // Generate a unique id for each task
        title: "Finish homework",
        completed: false,
      },
      {
        id: uuidv4(), // Generate a unique id for each task
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
