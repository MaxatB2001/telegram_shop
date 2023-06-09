const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://maxat:mega_max2001@cluster0.rtj1oa1.mongodb.net/auto?retryWrites=true&w=majority", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })  
    console.log(`MongoDB connected`)
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

module.exports = { connectDB }