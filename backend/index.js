require("dotenv").config();

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoString = process.env.MONGODB_URI;
const cookieParser = require("cookie-parser");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "PUT", "PATCH", "DELETE", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
// app.use(bodyParser.raw({type: "*/*"}));
// app.use(bodyParser.json());
// app.use(express.raw({type: 'application/json'}));
// app.use(bodyParser.text({type: 'application/json'}));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cookieParser());

// only use the raw bodyParser for webhooks
app.use((req, res, next) => {
  if (req.originalUrl === "/payment/webhook") next();
  else bodyParser.json()(req, res, next);
});

// ROUTES
app.use("/search", require("./routes/Search")); // TMDB API
app.use("/movies", require("./routes/Movies"));
app.use("/cinemas", require("./routes/Cinemas"));
app.use("/seattypes", require("./routes/SeatTypes"));
app.use("/screenings", require("./routes/Screenings"));
app.use("/authentication", require("./routes/Authentication"));
app.use("/payment", require("./routes/Payment"));
app.use("/tickets", require("./routes/Tickets"));
app.use("/users", require("./routes/Users"));

app.get("/", (req, res) => {
  console.log("GET /");
  res.send("HELLO FROM BACKEND");
});
connectDB().then(() => {
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))});
