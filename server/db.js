const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://dewanshgopani17:dbgopani17@project1.ronye8n.mongodb.net/?retryWrites=true&w=majority&appName=Project1', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true, // Ensures that indexes are created in MongoDB for unique fields
      useFindAndModify: false // Disables deprecated findAndModify function
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
