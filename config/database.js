const mongoose = require("mongoose");

module.exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL , {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connect to database successfully");
  } catch (err) {
    console.log("Connect to database failed");
  }
};
