const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const hostname = '127.0.0.1'; // Your server ip address
const port = 3000;
const version = '3,000,000';

require("dotenv/config");
app.use(bodyParser.json());

// // Middle ware
// app.use("/posts", () => {
//   console.log("This is the middleware");
// });

// Import Routes
const postsHistory = require("./routes/historyreports");
const userDetails = require("./routes/userdetails");

app.use("/history", postsHistory);

app.use("/user", userDetails);

// Now we have the ability to create the routes
// Routes
app.get("/", (req, res) => {
  res.send("Im inside bannerghatta");
});

// connect to db
// mongoose.connect(process.env.DB_CONNECTION, () => {
//   console.log("connected");
// });
mongoose.connect("mongodb+srv://admin:LuabCTHJaLnTHSe7@cluster0.5ukdudk.mongodb.net/?retryWrites=true&w=majority", () => {
  console.log("connected");
});



// Need to listen to the server
// const port = process.env.PORT || 8084;
// app.listen(port);

app.listen(port, () => {
  console.log(`[Version ${version}]: Server running at http://${hostname}:${port}/`);
})
